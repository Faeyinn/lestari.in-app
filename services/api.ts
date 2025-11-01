import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS, API_HEADERS } from '@/constants/api';

interface SignupData {
  email: string;
  name: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ProfileData {
  bio?: string;
}

interface ChatbotData {
  message: string;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

class ApiService {
  private axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: API_HEADERS,
    timeout: 10000,
  });

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired, clear storage
          AsyncStorage.removeItem('access_token');
        }
        return Promise.reject(error);
      }
    );
  }

  async signup(data: SignupData): Promise<ApiResponse> {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(API_ENDPOINTS.signup, data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  }

  async login(data: LoginData): Promise<ApiResponse> {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(API_ENDPOINTS.login, data);
      const { access } = response.data;
      if (access) {
        await AsyncStorage.setItem('access_token', access);
      }
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async getProfile(): Promise<ApiResponse> {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(API_ENDPOINTS.profile);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get profile');
    }
  }

  async updateProfile(data: ProfileData): Promise<ApiResponse> {
    try {
      const response: AxiosResponse = await this.axiosInstance.put(API_ENDPOINTS.profile, data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }

  async sendChatbotMessage(data: ChatbotData): Promise<ApiResponse> {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(API_ENDPOINTS.chatbot, data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('access_token');
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem('access_token');
    return !!token;
  }
}

export const apiService = new ApiService();
