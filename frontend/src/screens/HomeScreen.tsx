import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../ThemeProvider';
import { RadarChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ConfettiCannon from 'react-native-confetti-cannon';

const screenWidth = Dimensions.get('window').width;

const radarData = {
  labels: ['Strength', 'Cardio', 'Flexibility', 'Endurance', 'Balance'],
  data: [80, 65, 90, 70, 60],
};

const weeklyStats = [5, 4, 6, 3, 7, 2, 5];
const monthlyStats = [20, 18, 22, 15, 25, 19, 21, 23, 20, 18, 22, 24];

const badges = [
  { icon: '🏆', label: '7-Day Streak', unlocked: true, rarity: 'common' },
  { icon: '💪', label: 'First Workout', unlocked: true, rarity: 'rare' },
  { icon: '🔥', label: '1000 Calories', unlocked: false, rarity: 'epic' },
];

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const [xp, setXp] = useState(1200);
  const [xpMax, setXpMax] = useState(1500);
  const [level, setLevel] = useState(5);
  const [streak, setStreak] = useState(8);
  const [showConfetti, setShowConfetti] = useState(false);

  // Animated XP bar
  const xpAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(xpAnim, {
      toValue: xp / xpMax,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [xp, xpMax]);

  // Animated streak glow
  const streakGlow = useRef(new Animated.Value(0.7)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(streakGlow, { toValue: 1, duration: 900, useNativeDriver: false }),
        Animated.timing(streakGlow, { toValue: 0.7, duration: 900, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  // Badge animations
  const badgeAnimations = useRef(badges.map(() => new Animated.Value(1))).current;
  const badgeScaleAnimations = useRef(badges.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    // Animate unlocked badges
    badges.forEach((badge, index) => {
      if (badge.unlocked) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(badgeAnimations[index], { toValue: 1.1, duration: 2000, useNativeDriver: true }),
            Animated.timing(badgeAnimations[index], { toValue: 1, duration: 2000, useNativeDriver: true }),
          ])
        ).start();
      }
    });
  }, []);

  const handleBadgePress = (badge: any, index: number) => {
    if (badge.unlocked) {
      // Trigger confetti for unlocked badges
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      // Scale animation on press
      Animated.sequence([
        Animated.timing(badgeScaleAnimations[index], { toValue: 1.3, duration: 150, useNativeDriver: true }),
        Animated.timing(badgeScaleAnimations[index], { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
  };

  const handleLevelUp = () => {
    setLevel(prev => prev + 1);
    setXp(0);
    setXpMax(prev => prev + 500);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
        {/* Profile Card */}
        <View style={{ alignItems: 'center', marginTop: theme.spacing.lg, marginBottom: theme.spacing.lg }}>
          <LinearGradient
            colors={theme.colors.glassGradient as [string, string]}
            style={{ width: screenWidth * 0.9, borderRadius: 24, padding: theme.spacing.lg, alignItems: 'center', shadowColor: theme.colors.primary, shadowOpacity: 0.15, shadowRadius: 16, elevation: 4 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.card, marginRight: theme.spacing.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <Text style={{ fontSize: 32 }}>👤</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.colors.text, fontSize: 20, fontWeight: 'bold' }}>Sam Lopez</Text>
                <Text style={{ color: theme.colors.textSecondary, fontSize: 14 }}>Level {level} · Fitness UI/UX</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <Animated.View style={{
                    width: xpAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 120] }),
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.colors.primary,
                    marginRight: 8,
                  }} />
                  <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{xp}/{xpMax} XP</Text>
                </View>
              </View>
              <Animated.View style={{
                marginLeft: theme.spacing.md,
                backgroundColor: theme.colors.accent,
                borderRadius: 16,
                paddingVertical: 6,
                paddingHorizontal: 14,
                shadowColor: theme.colors.accent,
                shadowOpacity: streakGlow,
                shadowRadius: 12,
                elevation: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ color: theme.colors.background, fontWeight: 'bold', fontSize: 16 }}>🔥 {streak}d</Text>
                <Text style={{ color: theme.colors.background, fontSize: 10 }}>Streak</Text>
              </Animated.View>
            </View>
          </LinearGradient>
        </View>

        {/* Radar Chart */}
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.primary, fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Training Progress</Text>
          <View style={{ borderRadius: 24, backgroundColor: 'transparent' }}>
            <RadarChart
              data={radarData.data}
              labels={radarData.labels}
              chartSize={220}
              maxValue={100}
              noOfSections={5}
              polygonConfig={{
                stroke: theme.colors.primary,
                fill: theme.colors.primary + '33',
              }}
              gridConfig={{
                stroke: theme.colors.textSecondary,
              }}
              labelConfig={{
                fontSize: 14,
                stroke: theme.colors.textSecondary,
              }}
            />
          </View>
        </View>

        {/* Badges / Achievements */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.secondary, fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Achievements</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {badges.map((badge, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleBadgePress(badge, idx)}
                style={{ alignItems: 'center', marginHorizontal: 12 }}
              >
                <Animated.View style={{
                  transform: [
                    { scale: badgeScaleAnimations[idx] },
                    { rotate: badgeAnimations[idx].interpolate({
                      inputRange: [1, 1.1],
                      outputRange: ['0deg', '5deg']
                    })}
                  ],
                  opacity: badge.unlocked ? 1 : 0.3,
                }}>
                  <Text style={{ fontSize: 48, marginBottom: 4 }}>{badge.icon}</Text>
                </Animated.View>
                <Text style={{ 
                  color: badge.unlocked ? theme.colors.textSecondary : theme.colors.textSecondary + '66',
                  fontSize: 12,
                  textAlign: 'center'
                }}>
                  {badge.label}
                </Text>
                {badge.unlocked && (
                  <View style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: theme.colors.accent,
                    borderWidth: 2,
                    borderColor: theme.colors.background,
                  }} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.accent, fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Weekly Activity</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: theme.colors.card, borderRadius: 16, padding: theme.spacing.md }}>
            {weeklyStats.map((val, idx) => (
              <View key={idx} style={{ alignItems: 'center', flex: 1 }}>
                <Animated.View 
                  style={{ 
                    height: val * 10, 
                    width: 16, 
                    backgroundColor: theme.colors.primary, 
                    borderRadius: 8, 
                    marginBottom: 4 
                  }} 
                />
                <Text style={{ color: theme.colors.textSecondary, fontSize: 10 }}>D{idx + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Monthly Activity */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ color: theme.colors.secondary, fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Monthly Activity</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', backgroundColor: theme.colors.card, borderRadius: 16, padding: theme.spacing.md }}>
            {monthlyStats.map((val, idx) => (
              <View key={idx} style={{ alignItems: 'center', flex: 1 }}>
                <Animated.View 
                  style={{ 
                    height: val * 4, 
                    width: 8, 
                    backgroundColor: theme.colors.accent, 
                    borderRadius: 4, 
                    marginBottom: 4 
                  }} 
                />
                <Text style={{ color: theme.colors.textSecondary, fontSize: 8 }}>{idx + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Level Up Button */}
        <TouchableOpacity
          onPress={handleLevelUp}
          style={{
            backgroundColor: theme.colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 12,
            alignSelf: 'center',
            marginTop: theme.spacing.md,
          }}
        >
          <Text style={{ color: theme.colors.background, fontWeight: 'bold', fontSize: 16 }}>
            🎉 Level Up! (+500 XP)
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confetti */}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: screenWidth / 2, y: 0 }}
          colors={[theme.colors.primary, theme.colors.accent, theme.colors.secondary]}
          autoStart={true}
          fadeOut={true}
        />
      )}
    </SafeAreaView>
  );
}; 