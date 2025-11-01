import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { ReportCameraView } from '@/components/report/ReportCameraView';

// Dapatkan referensi ke gambar placeholder
const trashImage = require('@/assets/images/placeholder-waste.png');

export default function ReportScreen() {
  const router = useRouter();

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleTakePhoto = () => {
    // Dapatkan URI gambar yang akan dikirim ke layar berikutnya
    const imageUri = Image.resolveAssetSource(trashImage).uri;

    router.replace({ 
      pathname: '/report-detail', 
      params: { imageUri: imageUri } 
    });
  };

  return (
    <View style={styles.container}>
      {/* Latar Belakang Overlay */}
      <Pressable style={StyleSheet.absoluteFill} onPress={handleClose}>
        <Animated.View
          entering={FadeIn.duration(200)}
          style={styles.overlay}
        />
      </Pressable>

      {/* Konten Modal yang slide dari bawah */}
      <Animated.View
        entering={SlideInDown.duration(400).springify()}
        exiting={SlideOutDown.duration(300).springify()}
        style={styles.modalContainer}
      >
        <ReportCameraView onTakePhoto={handleTakePhoto} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    width: '100%',
  },
});