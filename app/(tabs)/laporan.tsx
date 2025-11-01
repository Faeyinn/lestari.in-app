import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LaporanSearchBar } from '@/components/laporan/LaporanSearchBar';
import { LaporanCard } from '@/components/laporan/LaporanCard';
import { BottomNav } from '@/components/navigation/BottomNav';

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

const reportData: Report[] = [
  {
    id: '1',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400',
  },
  {
    id: '2',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400',
  },
  {
    id: '3',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400',
  },
  {
    id: '4',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400',
  },
  {
    id: '5',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400',
  },
  {
    id: '6',
    category: 'Sampah',
    labels: ['Banyak Sampah', 'Sampah Anorganik'],
    location: 'Lembah Harau',
    description: 'Banyaknya sampah di area ini yang membuat warga resah',
    author: 'Budi Herman',
    date: 'October 25, 2025',
    image: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=400',
  },
];

export default function LaporanScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [reports, setReports] = useState<Report[]>(reportData);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const filteredReports = reports.filter((report) =>
    report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }: { item: Report; index: number }) => (
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
        <View style={styles.header}>
          <LaporanSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Telusuri Laporan"
          />
        </View>
      </SafeAreaView>

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
    backgroundColor: '#F5F5F5',
  },
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
});