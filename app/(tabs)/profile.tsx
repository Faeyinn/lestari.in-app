import { BottomNav } from '@/components/navigation/BottomNav';
import { BadgeAchievements } from '@/components/profile/BadgeAchievements';
import { MenuButton } from '@/components/profile/MenuButton';
import { ProfileBadge } from '@/components/profile/ProfileBadge';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatsCard } from '@/components/profile/StatsCard';
import { apiService } from '@/services/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileData {
  name: string;
  email: string;
  city?: string;
  points?: number;
  reports_sent?: number;
  reports_verified?: number;
  environmental_guardian?: number;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiService.getProfile();
        setProfileData(response.data);
      } catch (error: any) {
        Alert.alert('Error', 'Failed to load profile data');
        // Redirect to login if not authenticated
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    // Navigate to edit profile
    router.push('/edit-profile');
  };

  const handleLeaderboard = () => {
    // Navigate to leaderboard
    router.push('/leaderboard');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D5F4F" />
      </View>
    );
  }

  if (!profileData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with gradient */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#6B9D73', '#2D5F4F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <SafeAreaView edges={['top']}>
              <Animated.View
                entering={FadeInUp.delay(100).duration(600).springify()}
              >
                <ProfileHeader
                  name={profileData.name || "User"}
                  city={profileData.city || "Mahasiswa"}
                  email={profileData.email}
                />
              </Animated.View>
            </SafeAreaView>
          </LinearGradient>

          {/* Badge in center */}
          <Animated.View
            entering={FadeInUp.delay(200).duration(600).springify()}
            style={styles.badgeContainer}
          >
            <ProfileBadge />
          </Animated.View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* User Card with Points */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(600).springify()}
            style={styles.pointsCardContainer}
          >
            <LinearGradient
              colors={['#8FBC8F', '#2D5F4F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.pointsCard}
            >
              <View style={styles.pointsContent}>
                <View style={styles.pointsLeft}>
                  <Text style={styles.userName}>{profileData.name || "User"}</Text>
                  <Text style={styles.pointsLabel}>Total Poin Kontribusi</Text>
                  <Text style={styles.contribution}>
                    50 KG dari ditargetkan level 5
                  </Text>
                </View>

                <View style={styles.pointsRight}>
                  <Text style={styles.pointsValue}>{profileData.points || 0}</Text>
                  <Text style={styles.pointsUnit}>Pts</Text>
                  <TouchableOpacity style={styles.exchangeButton}>
                    <Text style={styles.exchangeButtonText}>
                      Tukar{'\n'}Poin
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '90%' }]} />
                </View>
                <Text style={styles.progressText}>
                  90% <Text style={styles.progressMax}>dari 500 Pts</Text>
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Stats Cards */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(600).springify()}
            style={styles.statsContainer}
          >
            <StatsCard title="Laporan Dikirim" value={profileData.reports_sent?.toString() || "0"} />
            <StatsCard title="Laporan Terverifikasi" value={profileData.reports_verified?.toString() || "0"} />
            <StatsCard title="Penjaga Lingkungan" value={profileData.environmental_guardian?.toString() || "0"} gradient />
          </Animated.View>

          {/* Badge Achievements */}
          <Animated.View
            entering={FadeInDown.delay(500).duration(600).springify()}
          >
            <BadgeAchievements />
          </Animated.View>

          {/* Menu Buttons */}
          <Animated.View
            entering={FadeInDown.delay(600).duration(600).springify()}
          >
            <MenuButton
              title="Edit Profil"
              onPress={handleEditProfile}
              icon="person-outline"
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(700).duration(600).springify()}
          >
            <MenuButton
              title="Leaderboard"
              onPress={handleLeaderboard}
              icon="trophy-outline"
            />
          </Animated.View>
        </View>
      </ScrollView>

      <BottomNav activeRoute="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    position: 'relative',
    paddingBottom: 60,
  },
  gradient: {
    paddingBottom: 80,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    transform: [{ scaleX: 2 }],
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  pointsCardContainer: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  pointsCard: {
    padding: 20,
    paddingBottom: 16,
  },
  pointsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pointsLeft: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  pointsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  contribution: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  pointsRight: {
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 46,
  },
  pointsUnit: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: -4,
    marginBottom: 6,
  },
  exchangeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  exchangeButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 13,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressMax: {
    fontWeight: '400',
    opacity: 0.85,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
});