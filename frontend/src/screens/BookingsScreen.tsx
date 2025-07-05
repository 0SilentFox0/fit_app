import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { useTheme } from '../ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface BookingsScreenProps {
  navigation: any;
}

const sessions = [
  {
    id: '1',
    trainerName: 'Sarah Johnson',
    trainerSpecialty: 'Yoga & Pilates',
    date: 'Today',
    time: '10:00 AM',
    duration: '60 min',
    status: 'confirmed',
    type: 'yoga',
    progress: 0,
    avatar: '🧘‍♀️',
    rating: 4.9,
  },
  {
    id: '2',
    trainerName: 'Mike Chen',
    trainerSpecialty: 'Strength Training',
    date: 'Tomorrow',
    time: '2:00 PM',
    duration: '45 min',
    status: 'pending',
    type: 'strength',
    progress: 0,
    avatar: '💪',
    rating: 4.8,
  },
  {
    id: '3',
    trainerName: 'Emma Davis',
    trainerSpecialty: 'Cardio & HIIT',
    date: 'Friday',
    time: '9:00 AM',
    duration: '30 min',
    status: 'completed',
    type: 'cardio',
    progress: 100,
    avatar: '🏃‍♀️',
    rating: 4.7,
  },
];

const bookingStats = [
  { label: 'Total Sessions', value: 8, color: '#FF6B6B' },
  { label: 'This Month', value: 5, color: '#4ECDC4' },
  { label: 'Upcoming', value: 3, color: '#45B7D1' },
];

const sessionTypes = [
  { name: 'Yoga', icon: 'leaf', color: '#FF6B6B', count: 4 },
  { name: 'Strength', icon: 'dumbbell', color: '#4ECDC4', count: 3 },
  { name: 'Cardio', icon: 'heart', color: '#45B7D1', count: 2 },
  { name: 'HIIT', icon: 'flash', color: '#96CEB4', count: 1 },
];

export const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Animated values for stats
  const statsAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // Session card animations
  const sessionAnimations = useRef(sessions.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animate stats on mount
    statsAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: bookingStats[index].value,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    });

    // Animate session cards
    sessionAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 800 + index * 200,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handleSessionPress = (sessionId: string) => {
    console.log('Opening session:', sessionId);
  };

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  const getSessionColor = (type: string) => {
    switch (type) {
      case 'yoga':
        return '#FF6B6B';
      case 'strength':
        return '#4ECDC4';
      case 'cardio':
        return '#45B7D1';
      default:
        return theme.colors.primary;
    }
  };

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'yoga':
        return 'leaf';
      case 'strength':
        return 'dumbbell';
      case 'cardio':
        return 'heart';
      default:
        return 'fitness';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'completed':
        return theme.colors.primary;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: theme.spacing.lg }}>
        {/* Header */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 }}>
            Bookings
          </Text>
          <Text style={{ fontSize: 16, color: theme.colors.textSecondary }}>
            Manage your training sessions
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.lg }}>
          {bookingStats.map((stat, index) => (
            <LinearGradient
              key={stat.label}
              colors={[stat.color, stat.color + 'CC']}
              style={{ flex: 1, backgroundColor: theme.colors.card, padding: theme.spacing.lg, borderRadius: 16, marginHorizontal: 4, alignItems: 'center', shadowColor: stat.color, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 }}
            >
              <Animated.Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.background }}>
                {statsAnimations[index]}
              </Animated.Text>
              <Text style={{ fontSize: 12, color: theme.colors.background + 'CC', marginTop: 4, textAlign: 'center' }}>
                {stat.label}
              </Text>
            </LinearGradient>
          ))}
        </View>

        {/* Session Types Filter */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.primary, marginBottom: theme.spacing.md }}>
            Session Types
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {sessionTypes.map((type) => (
              <TouchableOpacity
                key={type.name}
                onPress={() => handleFilterPress(type.name.toLowerCase())}
                style={{
                  flex: 1,
                  backgroundColor: selectedFilter === type.name.toLowerCase() ? type.color : theme.colors.card,
                  padding: theme.spacing.md,
                  borderRadius: 12,
                  marginHorizontal: 4,
                  alignItems: 'center',
                  shadowColor: type.color,
                  shadowOpacity: selectedFilter === type.name.toLowerCase() ? 0.2 : 0.05,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <MaterialCommunityIcons
                  name={type.icon as any}
                  size={24}
                  color={selectedFilter === type.name.toLowerCase() ? theme.colors.background : type.color}
                />
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: selectedFilter === type.name.toLowerCase() ? theme.colors.background : theme.colors.text,
                  marginTop: 4,
                }}>
                  {type.name}
                </Text>
                <Text style={{
                  fontSize: 10,
                  color: selectedFilter === type.name.toLowerCase() ? theme.colors.background + 'CC' : theme.colors.textSecondary,
                }}>
                  {type.count} sessions
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Your Sessions */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.primary, marginBottom: theme.spacing.md }}>
            Your Sessions
          </Text>
          {sessions.map((session, index) => (
            <Animated.View
              key={session.id}
              style={{
                transform: [{ translateY: sessionAnimations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                })}],
                opacity: sessionAnimations[index],
              }}
            >
              <LinearGradient
                colors={[theme.colors.card, theme.colors.card + 'DD']}
                style={{
                  borderRadius: 16,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.md,
                  shadowColor: getSessionColor(session.type),
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <TouchableOpacity onPress={() => handleSessionPress(session.id)}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <View style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: getSessionColor(session.type) + '20',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 12,
                      }}>
                        <Text style={{ fontSize: 24 }}>{session.avatar}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text, marginBottom: 2 }}>
                          {session.trainerName}
                        </Text>
                        <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginBottom: 4 }}>
                          {session.trainerSpecialty}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                          <Text style={{ fontSize: 12, color: theme.colors.warning, marginRight: 4 }}>
                            ⭐ {session.rating}
                          </Text>
                          <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                            {session.duration}
                          </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginRight: 12 }}>
                            📅 {session.date}
                          </Text>
                          <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                            ⏰ {session.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      backgroundColor: getStatusColor(session.status),
                    }}>
                      <Text style={{ fontSize: 10, fontWeight: '500', color: theme.colors.background, textTransform: 'capitalize' }}>
                        {session.status}
                      </Text>
                    </View>
                  </View>

                  {/* Progress Bar for completed sessions */}
                  {session.status === 'completed' && (
                    <View style={{ marginTop: theme.spacing.sm }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>Session Progress</Text>
                        <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>{session.progress}%</Text>
                      </View>
                      <View style={{
                        height: 6,
                        backgroundColor: theme.colors.border,
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}>
                        <Animated.View style={{
                          height: '100%',
                          width: `${session.progress}%`,
                          backgroundColor: getSessionColor(session.type),
                          borderRadius: 3,
                        }} />
                      </View>
                    </View>
                  )}

                  {/* Action buttons */}
                  <View style={{ flexDirection: 'row', marginTop: theme.spacing.sm }}>
                    {session.status === 'confirmed' && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: getSessionColor(session.type),
                          paddingVertical: 8,
                          paddingHorizontal: 16,
                          borderRadius: 8,
                          marginRight: 8,
                        }}
                      >
                        <Text style={{ color: theme.colors.background, fontWeight: '600', fontSize: 14 }}>
                          Join Session
                        </Text>
                      </TouchableOpacity>
                    )}
                    {session.status === 'pending' && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: theme.colors.warning,
                          paddingVertical: 8,
                          paddingHorizontal: 16,
                          borderRadius: 8,
                          marginRight: 8,
                        }}
                      >
                        <Text style={{ color: theme.colors.background, fontWeight: '600', fontSize: 14 }}>
                          Confirm
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'transparent',
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: theme.colors.border,
                      }}
                    >
                      <Text style={{ color: theme.colors.textSecondary, fontWeight: '600', fontSize: 14 }}>
                        Reschedule
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>

        {/* Quick Actions */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.accent, marginBottom: theme.spacing.md }}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {sessionTypes.map((type) => (
              <TouchableOpacity
                key={type.name}
                style={{
                  width: '48%',
                  backgroundColor: theme.colors.card,
                  padding: theme.spacing.lg,
                  borderRadius: 12,
                  marginBottom: theme.spacing.md,
                  alignItems: 'center',
                  shadowColor: type.color,
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <MaterialCommunityIcons
                  name={type.icon as any}
                  size={32}
                  color={type.color}
                  style={{ marginBottom: 8 }}
                />
                <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.text, marginBottom: 4 }}>
                  Book {type.name}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center' }}>
                  Schedule a new session
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 