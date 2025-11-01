import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ReportSearchBar } from '@/components/laporan/ReportSearchBar';
import { LaporanCard, Report } from '@/components/laporan/LaporanCard';
import { BottomNav } from '@/components/navigation/BottomNav';
import { LaporanSegmentedControl } from '@/components/laporan/LaporanSegmentedControl';

// --- Data Laporan (Semua Laporan) ---
const allReportsData: Report[] = [
  {
    id: '1',
    category: 'Kebakaran Hutan',
    labels: ['Kebakaran Besar'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1554188248-986adbb73c24?w=500',
    status: 'Diverifikasi', // Status ditambahkan
  },
  {
    id: '2',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500',
    status: 'Menunggu Verifikasi', // Status ditambahkan
  },
  {
    id: '3',
    category: 'Kualitas Air',
    labels: ['Air Keruh'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1530080913386-c5140c5ac476?w=500',
    status: 'Menunggu Verifikasi', // Status ditambahkan
  },
  {
    id: '4',
    category: 'Penebangan Hutan',
    labels: ['Penebangan Ilegal'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1542365287-3e1b6b3609b2?w=500',
    status: 'Selesai', // Status ditambahkan
  },
  {
    id: '5',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500',
    status: 'Ditolak', // Status ditambahkan
  },
];

// --- Data Laporan (Laporan Saya) ---
const myReportsData: Report[] = [
  // Data dari 09-laporan-saya.jpg
  {
    id: '1',
    category: 'Kebakaran Hutan',
    labels: ['Kebakaran Besar'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1554188248-986adbb73c24?w=500',
    status: 'Diverifikasi',
  },
  {
    id: '2',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500',
    status: 'Menunggu Verifikasi',
  },
  {
    id: '3',
    category: 'Kualitas Air',
    labels: ['Air Keruh'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1530080913386-c5140c5ac476?w=500',
    status: 'Menunggu Verifikasi',
  },
  {
    id: '4',
    category: 'Penebangan Hutan',
    labels: ['Penebangan Ilegal'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1542365287-3e1b6b3609b2?w=500',
    status: 'Selesai',
  },
  {
    id: '5',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500',
    status: 'Ditolak',
  },
];

type ActiveTab = 'Semua Laporan' | 'Laporan Saya';

export default function LaporanScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('Semua Laporan');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const dataToShow = activeTab === 'Semua Laporan' ? allReportsData : myReportsData;

  // Filter data berdasarkan searchQuery
  const filteredReports = dataToShow.filter((report) =>
    report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem: ListRenderItem<Report> = ({ item, index }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(500)
        .springify()}
    >
      <LaporanCard report={item} />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header: Search Bar + Filter Button */}
        <View style={styles.header}>
          <ReportSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Telusuri Laporan"
          />
        </View>

        {/* Segmented Control */}
        <View style={styles.segmentContainer}>
          <LaporanSegmentedControl
            activeTab={activeTab}
            onTabPress={(tab) => setActiveTab(tab)}
          />
        </View>
      </SafeAreaView>

      {/* Daftar Laporan */}
      <FlatList
        data={filteredReports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4A9D6F"
            colors={['#4A9D6F']}
          />
        }
      />

      <BottomNav activeRoute="laporan" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBF8', // Latar belakang putih kehijauan
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  segmentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100, // Padding untuk bottom nav
  },
});
