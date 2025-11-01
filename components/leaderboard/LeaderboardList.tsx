import { apiService } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { PodiumItem } from './PodiumItem';
import { RankItem } from './RankItem';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  points: number; // Assuming points instead of xp
  badge?: string; // Optional, if API provides
}

export const LeaderboardList = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await apiService.getLeaderboard();
        console.log('Leaderboard data:', response.data);
        // Assuming API returns an array of entries with id, rank, name, points
        const data = response.data.map((item: any, index: number) => ({
          id: item.id || index.toString(),
          rank: item.rank || index + 1,
          name: item.name || 'Unknown',
          points: item.points || 0,
          badge: item.badge, // If provided
        }));
        setLeaderboardData(data);
      } catch (error: any) {
        console.error('Leaderboard fetch error:', error);
        Alert.alert('Error', 'Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2D5F4F" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.listContainer}>
        {leaderboardData.map((item, index) => {
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
