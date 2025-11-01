import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { UserCard } from '@/components/map/UserCard';
import { PointsCard } from '@/components/map/PointsCard';
import { SearchBar } from '@/components/map/SearchBar';
import { WasteCard } from '@/components/map/WasteCard';
import { HeatmapMarker } from '@/components/map/HeatmapMarker';
import { BottomNav } from '@/components/navigation/BottomNav';

const INITIAL_REGION = {
  latitude: -0.9471,
  longitude: 100.4172,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

// Sample waste locations with heatmap intensity
const wasteLocations = [
  {
    id: '1',
    coordinate: { latitude: -0.9471, longitude: 100.4172 },
    title: 'Sampah',
    category: 'Belum ditindaklanjuti',
    date: '01 Nov 2025',
    location: 'Lokasi',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400',
    type: 'waste' as const,
    intensity: 'high' as const,
  },
  {
    id: '2',
    coordinate: { latitude: -0.9520, longitude: 100.4100 },
    title: 'Sampah',
    category: 'Belum ditindaklanjuti',
    date: '01 Nov 2025',
    location: 'Lokasi',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400',
    type: 'waste' as const,
    intensity: 'medium' as const,
  },
  {
    id: '3',
    coordinate: { latitude: -0.9400, longitude: 100.4250 },
    title: 'Sampah',
    category: 'Belum ditindaklanjuti',
    date: '01 Nov 2025',
    location: 'Lokasi',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400',
    type: 'waste' as const,
    intensity: 'low' as const,
  },
  {
    id: '4',
    coordinate: { latitude: -0.9550, longitude: 100.4200 },
    title: 'Sampah',
    category: 'Belum ditindaklanjuti',
    date: '01 Nov 2025',
    location: 'Lokasi',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400',
    type: 'fire' as const,
    intensity: 'high' as const,
  },
  {
    id: '5',
    coordinate: { latitude: -0.9350, longitude: 100.4080 },
    title: 'Sampah',
    category: 'Belum ditindaklanjuti',
    date: '01 Nov 2025',
    location: 'Lokasi',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400',
    type: 'recycle' as const,
    intensity: 'high' as const,
  },
  {
    id: '6',
    coordinate: { latitude: -0.9480, longitude: 100.4050 },
    title: 'Sampah',
    category: 'Belum ditindaklanjuti',
    date: '01 Nov 2025',
    location: 'Lokasi',
    image: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=400',
    type: 'waste' as const,
    intensity: 'medium' as const,
  },
];

export default function MapScreen() {
  const [selectedWaste, setSelectedWaste] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMarkerPress = (waste: any) => {
    setSelectedWaste(waste);
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        customMapStyle={mapStyle}
      >
        {/* User Location Marker */}
        <Marker
          coordinate={{ latitude: -0.9471, longitude: 100.4172 }}
        >
          <View style={styles.userMarker}>
            <Ionicons name="person" size={20} color="#4A9D6F" />
          </View>
        </Marker>

        {/* Waste Location Markers with Heatmap */}
        {wasteLocations.map((waste) => (
          <HeatmapMarker
            key={waste.id}
            coordinate={waste.coordinate}
            type={waste.type}
            intensity={waste.intensity}
            onPress={() => handleMarkerPress(waste)}
          />
        ))}
      </MapView>

      <SafeAreaView style={styles.overlay} edges={['top']}>
        {/* Cards Container */}
        <View style={styles.cardsRow}>
          {/* User Card */}
          <Animated.View
            entering={FadeInDown.delay(100).duration(600).springify()}
            style={styles.userCardContainer}
          >
            <UserCard
              name="Rahmat Fajar Saputra"
              points={450}
              contribution="50 XP lagi menuju level 5"
            />
          </Animated.View>

          {/* Points Card */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(600).springify()}
            style={styles.pointsCardContainer}
          >
            <PointsCard
              points={300}
              maxPoints={500}
            />
          </Animated.View>
        </View>

        {/* Search Bar */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(600).springify()}
          style={styles.searchContainer}
        >
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Telusuri Lokasi"
          />
        </Animated.View>

        {/* Waste Card */}
        {selectedWaste && (
          <Animated.View
            entering={FadeInUp.duration(400).springify()}
            style={styles.wasteCardContainer}
          >
            <WasteCard
              title={selectedWaste.title}
              category={selectedWaste.category}
              date={selectedWaste.date}
              location={selectedWaste.location}
              image={selectedWaste.image}
              onClose={() => setSelectedWaste(null)}
            />
          </Animated.View>
        )}
      </SafeAreaView>

      {/* Bottom Navigation */}
      <BottomNav activeRoute="map" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  cardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  userCardContainer: {
    flex: 1,
  },
  pointsCardContainer: {
    width: 120,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  userMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4A9D6F',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wasteCardContainer: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    pointerEvents: 'box-none',
  },
});

// Custom map style for mint/light green appearance
const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#C7F0DB' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#A8DCD1' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#FFFFFF' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#B8E6D5' }],
  },
];