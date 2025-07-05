import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../ThemeProvider';

const { width } = Dimensions.get('window');

export const ProfileScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const [selectedTab, setSelectedTab] = useState('profile');

  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    level: 15,
    xp: 2840,
    nextLevelXp: 3000,
    joinDate: 'March 2024',
    totalWorkouts: 47,
    totalHours: 89,
    streak: 12,
    achievements: 8,
  };

  const stats = [
    { label: 'Workouts', value: user.totalWorkouts, icon: 'fitness' },
    { label: 'Hours', value: user.totalHours, icon: 'time' },
    { label: 'Streak', value: user.streak, icon: 'flame' },
    { label: 'Achievements', value: user.achievements, icon: 'trophy' },
  ];

  const menuItems = [
    { title: 'Edit Profile', icon: 'person-outline', action: () => {} },
    { title: 'Settings', icon: 'settings-outline', action: () => {} },
    { title: 'Notifications', icon: 'notifications-outline', action: () => {} },
    { title: 'Privacy', icon: 'shield-outline', action: () => {} },
    { title: 'Help & Support', icon: 'help-circle-outline', action: () => {} },
    { title: 'About', icon: 'information-circle-outline', action: () => {} },
    { title: 'Logout', icon: 'log-out-outline', action: () => {}, isDestructive: true },
  ];

  const progressPercentage = (user.xp / user.nextLevelXp) * 100;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with gradient */}
      <LinearGradient
        colors={[colors.primary, colors.chart1]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>AJ</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.primaryForeground }]}>
              {user.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.primaryForeground }]}>
              {user.email}
            </Text>
            <View style={styles.levelContainer}>
              <Text style={[styles.levelText, { color: colors.primaryForeground }]}>
                Level {user.level}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* XP Progress */}
      <View style={[styles.xpContainer, { backgroundColor: colors.card }]}>
        <View style={styles.xpHeader}>
          <Text style={[styles.xpTitle, { color: colors.foreground }]}>
            Experience Points
          </Text>
          <Text style={[styles.xpValue, { color: colors.primary }]}>
            {user.xp} / {user.nextLevelXp} XP
          </Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: colors.muted }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.primary,
                width: `${progressPercentage}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View
            key={index}
            style={[styles.statCard, { backgroundColor: colors.card }]}
          >
            <Ionicons
              name={stat.icon as any}
              size={24}
              color={colors.primary}
              style={styles.statIcon}
            />
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: colors.card }]}
            onPress={item.action}
          >
            <View style={styles.menuItemContent}>
              <Ionicons
                name={item.icon as any}
                size={20}
                color={item.isDestructive ? colors.destructive : colors.foreground}
              />
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: item.isDestructive ? colors.destructive : colors.foreground,
                  },
                ]}
              >
                {item.title}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.mutedForeground}
            />
          </TouchableOpacity>
        ))}
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
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  levelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  xpContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  xpValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
}); 