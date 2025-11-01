import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { PodiumItem } from './PodiumItem';
import { RankItem } from './RankItem';

// Data Mockup berdasarkan gambar
const badge4 = require('@/assets/images/badge-4.png');
const badge2 = require('@/assets/images/badge-2.png');

const podiumData = [
  { id: '1', rank: 1, name: 'Beyonder', xp: 1330, badge: badge4 },
  { id: '2', rank: 2, name: 'Lestariiiinnn', xp: 1000, badge: badge4 },
  { id: '3', rank: 3, name: 'heketon', xp: 680, badge: badge2 },
];

const listData = [
  { id: '4', rank: 4, name: 'Rahmat Fajar Saputra', xp: 450, badge: badge2 },
  { id: '5', rank: 5, name: 'Fadhillah Rahmad Kurnia', xp: 420, badge: badge2 },
  { id: '6', rank: 6, name: 'Fadhillah Rahmad Kurnia', xp: 400, badge: badge2 },
  { id: '7', rank: 7, name: 'Hanaviz', xp: 390, badge: badge2 },
  { id: '8', rank: 8, name: 'Widia Khairunisa', xp: 350, badge: badge2 },
  { id: '9', rank: 9, name: 'Rahmat Fajar Saputra', xp: 450, badge: badge2 },
  { id: '10', rank: 10, name: 'Dedi Irwansyah', xp: 420, badge: badge2 },
  { id: '11', rank: 11, name: 'Dedi Irwansyah', xp: 400, badge: badge2 },
  { id: '12', rank: 12, name: 'Dedi Irwansyah', xp: 390, badge: badge2 },
  { id: '13', rank: 13, name: 'Dedi Irwansyah', xp: 350, badge: badge2 },
  { id: '14', rank: 14, name: 'Dedi Irwansyah', xp: 400, badge: badge2 },
  { id: '15', rank: 15, name: 'Dedi Irwansyah', xp: 390, badge: badge2 },
  { id: '16', rank: 16, name: 'Dedi Irwansyah', xp: 350, badge: badge2 },
];

// Gabungkan podium + list jadi satu array (urut berdasarkan rank)
const combinedData = [...podiumData, ...listData].sort((a, b) => a.rank - b.rank);

export const LeaderboardList = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.listContainer}>
        {combinedData.map((item, index) => {
          // Untuk rank 1-3 gunakan PodiumItem agar tampil beda, sisanya RankItem
          if (item.rank === 1 || item.rank === 2 || item.rank === 3) {
            return <PodiumItem key={item.id} entry={item as any} rank={item.rank as 1 | 2 | 3} />;
          }
          return <RankItem key={item.id} entry={item as any} index={index} />;
        })}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  listContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});