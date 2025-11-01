import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface Report {
  id: string;
  category: string;
  labels: string[];
  location: string;
  description: string;
  author: string;
  date: string;
  image: string;
}

interface LaporanCardProps {
  report: Report;
  onPress?: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const LaporanCard: React.FC<LaporanCardProps> = ({ report, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.97);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedTouchable
      style={[styles.container, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.95}
    >
      <View style={styles.card}>
        {/* Image */}
        <Image
          source={{ uri: report.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Category */}
          <View style={styles.row}>
            <Text style={styles.fieldLabel}>Kategori :</Text>
            <Text style={styles.categoryText}>{report.category}</Text>
          </View>

          {/* Labels */}
          <View style={styles.row}>
            <Text style={styles.fieldLabel}>Label :</Text>
            <View style={styles.labelsContainer}>
              {report.labels.map((label, index) => (
                <View
                  key={index}
                  style={[
                    styles.labelBadge,
                    index === 0 ? styles.labelBadgePrimary : styles.labelBadgeSecondary,
                  ]}
                >
                  <Text
                    style={[
                      styles.labelText,
                      index === 0 ? styles.labelTextPrimary : styles.labelTextSecondary,
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.row}>
            <Text style={styles.fieldLabel}>Lokasi :</Text>
            <Text style={styles.locationText}>{report.location}</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionRow}>
            <Text style={styles.fieldLabel}>Deskripsi</Text>
          </View>
          <Text style={styles.descriptionText}>{report.description}</Text>

          {/* Author and Date */}
          <View style={styles.footer}>
            <Text style={styles.authorText}>{report.author}</Text>
            <Text style={styles.dateText}>{report.date}</Text>
          </View>
        </View>
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#E5E7EB',
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  descriptionRow: {
    marginBottom: 6,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
  },
  labelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  labelBadgePrimary: {
    backgroundColor: '#FEE2E2',
  },
  labelBadgeSecondary: {
    backgroundColor: '#FEF3C7',
  },
  labelText: {
    fontSize: 11,
    fontWeight: '600',
  },
  labelTextPrimary: {
    color: '#DC2626',
  },
  labelTextSecondary: {
    color: '#D97706',
  },
  locationText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#4B5563',
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  authorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#9CA3AF',
  },
});