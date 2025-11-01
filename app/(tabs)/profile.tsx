import { BottomNav } from '@/components/navigation/BottomNav';
import { BadgeAchievements } from '@/components/profile/BadgeAchievements';
import { MenuButton } from '@/components/profile/MenuButton';
import { ProfileBadge } from '@/components/profile/ProfileBadge';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileSummaryCard } from '@/components/profile/ProfileSummaryCard';
import { RemainingPointsCard } from '@/components/profile/RemainingPointsCard';
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
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfileData {
  name: string;
  email: string;
  city?: string;
  points?: number;
  reports_sent?: number;
  reports_verified?: number;
  rank?: number;
}

export default function ProfileScreen() {
  const router = useRouter();
  // Data dummy yang sesuai dengan desain
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Beyonder',
    email: 'beyonder@gmail.com',
    city: 'Mahasiswa',
    points: 450,
    reports_sent: 15,
    reports_verified: 10,
    rank: 4,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profileResponse = await apiService.getProfile();
        const reportsResponse = await apiService.getUserReports();
        console.log('Profile data:', profileResponse.data);
        console.log('User reports data:', reportsResponse.data);

        // Map API response to expected format
        const apiData = profileResponse.data;
        const reportsData = reportsResponse.data;

        // Calculate reports sent and verified from user reports
        const reportsSent = reportsData.length || 0;
        const reportsVerified = reportsData.filter((report: any) => report.status === 'verified').length || 0;

        setProfileData({
          name: apiData.user?.name || 'User',
          email: apiData.user?.email || '',
          city: apiData.city || 'Mahasiswa',
          points: apiData.points || 0,
          reports_sent: reportsSent,
          reports_verified: reportsVerified,
          rank: apiData.rank || 0,
        });
      } catch (error: any) {
        console.error('Profile fetch error:', error);
        Alert.alert('Error', 'Failed to load profile data');
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleLeaderboard = () => {
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
        {/* Header dengan gradient dan lengkungan */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#4A9D6F', '#2D5F4F']} // stronger gradient as design
            style={styles.gradient}
          >
            <SafeAreaView edges={['top']}>
              <Animated.View entering={FadeInDown.delay(100).duration(600)}>
                <ProfileHeader
                  name={profileData.name}
                  city={profileData.city || 'Mahasiswa'}
                  email={profileData.email}
                />
              </Animated.View>
            </SafeAreaView>
          </LinearGradient>

          {/* Badge di tengah, overlap lebih besar */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.badgeContainer}
          >
            <ProfileBadge />
          </Animated.View>
        </View>

        {/* Konten Utama */}
        <View style={styles.content}>
          {/* Kartu Poin */}
          <View style={styles.pointsRow}>
            {/* Kartu Poin Utama (Besar) */}
            <Animated.View
              entering={FadeInDown.delay(300).duration(600)}
              style={styles.summaryCardContainer}
            >
              <ProfileSummaryCard
                name={profileData.name}
                points={profileData.points || 0}
                progress={90}
                progressText="50 XP lagi menuju level 5"
                maxPoints={500}
              />
            </Animated.View>

            {/* Kartu Poin Tersisa (Kecil) */}
            <Animated.View
              entering={FadeInDown.delay(400).duration(600)}
              style={styles.remainingPointsContainer}
            >
              <RemainingPointsCard points={500 - (profileData.points || 0)} />
            </Animated.View>
          </View>

          {/* Kartu Statistik */}
          <Animated.View
            entering={FadeInDown.delay(500).duration(600)}
            style={styles.statsContainer}
          >
            <StatsCard
              title="Laporan Dikirim"
              value={profileData.reports_sent?.toString() || '0'}
            />
            <StatsCard
              title="Laporan Terverifikasi"
              value={profileData.reports_verified?.toString() || '0'}
            />
            <StatsCard
              title="Peringkat Kontribusi"
              value={profileData.rank?.toString() || '0'}
              gradient
            />
          </Animated.View>

          {/* Badge Achievements */}
          <Animated.View entering={FadeInDown.delay(600).duration(600)}>
            <BadgeAchievements />
          </Animated.View>

          {/* Tombol Menu */}
          <Animated.View entering={FadeInDown.delay(700).duration(600)}>
            <MenuButton
              title="Edit Profil"
              onPress={handleEditProfile}
              icon="person-outline"
            />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(600)}>
            <MenuButton
              title="Leaderboard"
              onPress={handleLeaderboard}
              icon="trophy-outline"
            />
          </Animated.View>
        </View>
      </ScrollView>

      {/* Navigasi Bawah */}
      <BottomNav activeRoute="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBF8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FBF8',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    position: 'relative',
    paddingBottom: 90, // ruang untuk badge overlap lebih besar
    backgroundColor: '#F7FBF8',
  },
  gradient: {
    height: 240, // lebih tinggi agar lengkung lebih besar seperti desain
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    transform: [{ scaleX: 1.3 }],
    overflow: 'hidden',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 20, // tumpang tindih lebih besar sehingga badge menonjol
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 18,
  },
  pointsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  summaryCardContainer: {
    flex: 1,
  },
  remainingPointsContainer: {
    width: 120, // sedikit lebih lebar agar proporsi sesuai desain
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
});