import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ReportHeader } from '@/components/report/ReportHeader';
import { ReportDescriptionInput } from '@/components/report/ReportDescriptionInput';
import { ReportSubmitButton } from '@/components/report/ReportSubmitButton';

// Menggunakan gambar placeholder sampah yang telah Anda sediakan
const fallbackTrashImage = require('@/assets/images/placeholder-waste.png');

export default function ReportDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { imageUri } = params;
  
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Dapatkan sumber gambar, gunakan fallback jika URI tidak ada
  const imageSource = imageUri ? { uri: imageUri as string } : fallbackTrashImage;

  const handleSubmit = () => {
    if (!description.trim()) {
      Alert.alert('Deskripsi Kosong', 'Mohon masukkan deskripsi kondisi lingkungan.');
      return;
    }

    setLoading(true);
    console.log('Laporan Dikirim:', {
      imageUri,
      description,
    });
    
    // Simulasi pengiriman API
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Laporan Terkirim', 'Terima kasih atas kontribusi Anda.', [
        { text: 'OK', onPress: () => router.back() }, // Kembali setelah laporan terkirim
      ]);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header Kustom */}
        <Animated.View entering={FadeInUp.duration(400)}>
          <ReportHeader onBackPress={() => router.back()} />
        </Animated.View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Gambar Laporan */}
          <Animated.View entering={FadeInUp.delay(100).duration(500)}>
            <View style={styles.imageWrapper}>
              <Image source={imageSource} style={styles.image} />
            </View>
          </Animated.View>

          {/* Input Deskripsi */}
          <Animated.View entering={FadeInUp.delay(200).duration(500)}>
            <ReportDescriptionInput
              value={description}
              onChangeText={setDescription}
            />
          </Animated.View>
        </ScrollView>

        {/* Tombol Kirim */}
        <Animated.View
          style={styles.buttonContainer}
          entering={FadeInDown.delay(300).duration(500)}
        >
          <ReportSubmitButton
            title="Laporkan"
            onPress={handleSubmit}
            loading={loading}
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#73A997', // Warna hijau dari header
  },
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F7FBF8', // Latar belakang putih kehijauan
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  imageWrapper: {
    width: '100%',
    height: 400, // Tinggi gambar disesuaikan
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 20,
    backgroundColor: '#F7FBF8', // Senada dengan scrollview
  },
});