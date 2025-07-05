import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RadarChart } from 'react-native-gifted-charts';
import { useTheme } from '../ThemeProvider';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const [level, setLevel] = useState(15);
  const [xp, setXp] = useState(2840);
  const [xpMax] = useState(3000);
  const [streak, setStreak] = useState(12);
  const [showConfetti, setShowConfetti] = useState(false);

  const radarData = [
    { value: 85, label: 'Strength' },
    { value: 70, label: 'Cardio' },
    { value: 90, label: 'Flexibility' },
    { value: 75, label: 'Balance' },
    { value: 80, label: 'Endurance' },
  ];

  const badges = [
    { id: 1, name: '🏆', title: 'First Workout', unlocked: true },
    { id: 2, name: '🔥', title: 'Streak Master', unlocked: true },
    { id: 3, name: '💪', title: 'Strength Hero', unlocked: true },
    { id: 4, name: '🏃', title: 'Marathon Runner', unlocked: false },
    { id: 5, name: '🧘', title: 'Yoga Master', unlocked: false },
    { id: 6, name: '⚡', title: 'Speed Demon', unlocked: false },
  ];

  const weeklyData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 60 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 75 },
    { day: 'Fri', value: 50 },
    { day: 'Sat', value: 80 },
    { day: 'Sun', value: 65 },
  ];

  const monthlyData = [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 15 },
    { month: 'Mar', value: 18 },
    { month: 'Apr', value: 22 },
    { month: 'May', value: 25 },
    { month: 'Jun', value: 28 },
  ];

  const progressPercentage = (xp / xpMax) * 100;

  const handleLevelUp = () => {
    setLevel(level + 1);
    setXp(0);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with gradient */}
      <LinearGradient
        colors={[colors.primary, colors.chart1]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.primaryForeground }]}>Sam Lopez</Text>
            <Text style={[styles.userSubtitle, { color: colors.primaryForeground }]}>Level {level} · Fitness UI/UX</Text>
          </View>
          <TouchableOpacity style={styles.levelUpButton} onPress={handleLevelUp}>
            <Ionicons name="trophy" size={20} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>

        {/* XP Progress */}
        <View style={styles.xpContainer}>
          <View style={styles.xpHeader}>
            <Text style={[styles.xpTitle, { color: colors.primaryForeground }]}>Experience Points</Text>
            <Text style={[styles.xpValue, { color: colors.primaryForeground }]}>{xp}/{xpMax} XP</Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primaryForeground,
                  width: `${progressPercentage}%`,
                },
              ]}
            />
          </View>
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <LinearGradient
            colors={[colors.chart1, colors.chart2]}
            style={styles.statGradient}
          >
            <Ionicons name="flame" size={24} color={colors.primaryForeground} />
            <Text style={[styles.statValue, { color: colors.primaryForeground }]}>{streak}</Text>
            <Text style={[styles.statLabel, { color: colors.primaryForeground }]}>Day Streak</Text>
          </LinearGradient>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <LinearGradient
            colors={[colors.chart3, colors.chart4]}
            style={styles.statGradient}
          >
            <Ionicons name="fitness" size={24} color={colors.primaryForeground} />
            <Text style={[styles.statValue, { color: colors.primaryForeground }]}>47</Text>
            <Text style={[styles.statLabel, { color: colors.primaryForeground }]}>Workouts</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Radar Chart */}
      <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Fitness Radar</Text>
        <View style={styles.radarContainer}>
          <RadarChart
            data={radarData.map(item => item.value)}
            labels={radarData.map(item => item.label)}
            chartSize={200}
            maxValue={100}
            noOfSections={5}
            polygonConfig={{
              stroke: colors.primary,
              fill: colors.primary + '20',
            }}
            gridConfig={{
              stroke: colors.mutedForeground,
            }}
            labelConfig={{
              fontSize: 14,
              stroke: colors.mutedForeground,
            }}
          />
        </View>
      </View>

      {/* Badges */}
      <View style={[styles.badgesContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Achievements</Text>
        <View style={styles.badgesGrid}>
          {badges.map((badge, index) => (
            <TouchableOpacity
              key={badge.id}
              style={[
                styles.badgeItem,
                {
                  backgroundColor: badge.unlocked ? colors.primary + '20' : colors.muted,
                  borderColor: badge.unlocked ? colors.primary : colors.border,
                },
              ]}
            >
              <Text style={styles.badgeIcon}>{badge.name}</Text>
              <Text
                style={[
                  styles.badgeTitle,
                  {
                    color: badge.unlocked ? colors.foreground : colors.mutedForeground,
                  },
                ]}
              >
                {badge.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Weekly Activity */}
      <View style={[styles.activityContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Weekly Activity</Text>
        <View style={styles.weeklyChart}>
          {weeklyData.map((day, idx) => (
            <View key={idx} style={styles.weeklyBar}>
              <View
                style={[
                  styles.bar,
                  {
                    backgroundColor: colors.primary,
                    height: (day.value / 100) * 80,
                  },
                ]}
              />
              <Text style={[styles.dayLabel, { color: colors.mutedForeground }]}>D{idx + 1}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Monthly Progress */}
      <View style={[styles.monthlyContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Monthly Progress</Text>
        <View style={styles.monthlyChart}>
          {monthlyData.map((month, idx) => (
            <View key={idx} style={styles.monthlyBar}>
              <View
                style={[
                  styles.bar,
                  {
                    backgroundColor: colors.chart1,
                    height: (month.value / 30) * 60,
                  },
                ]}
              />
              <Text style={[styles.monthLabel, { color: colors.mutedForeground }]}>{idx + 1}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  levelUpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xpContainer: {
    marginTop: 10,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  xpTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  xpValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  chartContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  radarContainer: {
    alignItems: 'center',
  },
  centerLabel: {
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerLabelSubtext: {
    fontSize: 12,
  },
  badgesContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeItem: {
    width: (width - 80) / 3,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  activityContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
  },
  weeklyBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  monthlyContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  monthlyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
  },
  monthlyBar: {
    alignItems: 'center',
    flex: 1,
  },
  monthLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 8,
  },
}); 