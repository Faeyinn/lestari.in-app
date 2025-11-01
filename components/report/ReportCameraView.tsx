import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const trashImage = require('@/assets/images/placeholder-waste.png');

interface ReportCameraViewProps {
  onTakePhoto: () => void;
}

export const ReportCameraView: React.FC<ReportCameraViewProps> = ({
  onTakePhoto,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#9DE0A5', '#73A997']}
      style={[
        styles.sheetContainer,
        // Meningkatkan paddingBottom untuk mengangkat seluruh sheet
        { paddingBottom: insets.bottom > 0 ? insets.bottom + 20 : 34 }, 
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={trashImage} style={styles.image} resizeMode="cover" />
      </View>

      {/* Tombol Kamera */}
      <TouchableOpacity
        style={styles.cameraButtonWrapper}
        onPress={onTakePhoto}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#A0D0B8', '#80B887']}
          style={styles.cameraButton}
        >
          <Ionicons name="camera" size={38} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  imageContainer: {
    width: '100%',
    height: 500,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cameraButtonWrapper: {
    // Tombol ini tumpang tindih dengan bagian bawah image
    marginTop: -36, // Setengah tinggi tombol (72 / 2)
    width: 72,
    height: 72,
    borderRadius: 36,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cameraButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
});