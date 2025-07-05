import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { useTheme } from '../ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface WorkoutsScreenProps {
  navigation: any;
}

const workouts = [
  {
    id: '1',
    name: 'Morning Cardio Blast',
    duration: '30 min',
    date: 'Today',
    difficulty: 'Intermediate',
    completed: false,
    calories: 280,
    type: 'cardio',
    progress: 0,
  },
  {
    id: '2',
    name: 'Strength Training',
    duration: '45 min',
    date: 'Tomorrow',
    difficulty: 'Advanced',
    completed: true,
    calories: 320,
    type: 'strength',
    progress: 100,
  },
  {
    id: '3',
    name: 'Yoga Flow',
    duration: '25 min',
    date: 'Wednesday',
    difficulty: 'Beginner',
    completed: false,
    calories: 150,
    type: 'yoga',
    progress: 0,
  },
];

const workoutTypes = [
  { name: 'Cardio', icon: 'heart', color: '#FF6B6B', count: 12 },
  { name: 'Strength', icon: 'dumbbell', color: '#4ECDC4', count: 8 },
  { name: 'Yoga', icon: 'leaf', color: '#45B7D1', count: 6 },
  { name: 'HIIT', icon: 'flash', color: '#96CEB4', count: 4 },
];

export const WorkoutsScreen: React.FC<WorkoutsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState('all');
  const [totalWorkouts, setTotalWorkouts] = useState(12);
  const [completedWorkouts, setCompletedWorkouts] = useState(8);
  const [thisWeekWorkouts, setThisWeekWorkouts] = useState(4);

  // Animated progress bars
  const progressAnimations = useRef(workouts.map(() => new Animated.Value(0))).current;
  const statsAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Animate stats on mount
    statsAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: [totalWorkouts, completedWorkouts, thisWeekWorkouts][index],
        duration: 1500,
        useNativeDriver: false,
      }).start();
    });

    // Animate workout progress bars
    workouts.forEach((workout, index) => {
      Animated.timing(progressAnimations[index], {
        toValue: workout.progress / 100,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  const handleStartWorkout = (workoutId: string) => {
    // Handle workout start
    console.log('Starting workout:', workoutId);
  };

  const handleWorkoutTypePress = (type: string) => {
    setSelectedType(type);
  };

  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case 'cardio':
        return 'heart';
      case 'strength':
        return 'dumbbell';
      case 'yoga':
        return 'leaf';
      default:
        return 'fitness';
    }
  };

  const getWorkoutColor = (type: string) => {
    switch (type) {
      case 'cardio':
        return '#FF6B6B';
      case 'strength':
        return '#4ECDC4';
      case 'yoga':
        return '#45B7D1';
      default:
        return theme.colors.primary;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: theme.spacing.lg }}>
        {/* Header */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 }}>
            Workouts
          </Text>
          <Text style={{ fontSize: 16, color: theme.colors.textSecondary }}>
            Track your fitness journey
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.lg }}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primary + 'CC']}
            style={{ flex: 1, backgroundColor: theme.colors.card, padding: theme.spacing.lg, borderRadius: 16, marginHorizontal: 4, alignItems: 'center', shadowColor: theme.colors.primary, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 }}
          >
            <Animated.Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.background }}>
              {statsAnimations[0]}
            </Animated.Text>
            <Text style={{ fontSize: 12, color: theme.colors.background + 'CC', marginTop: 4 }}>Total</Text>
          </LinearGradient>
          <LinearGradient
            colors={[theme.colors.secondary, theme.colors.secondary + 'CC']}
            style={{ flex: 1, backgroundColor: theme.colors.card, padding: theme.spacing.lg, borderRadius: 16, marginHorizontal: 4, alignItems: 'center', shadowColor: theme.colors.secondary, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 }}
          >
            <Animated.Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.background }}>
              {statsAnimations[1]}
            </Animated.Text>
            <Text style={{ fontSize: 12, color: theme.colors.background + 'CC', marginTop: 4 }}>Completed</Text>
          </LinearGradient>
          <LinearGradient
            colors={[theme.colors.accent, theme.colors.accent + 'CC']}
            style={{ flex: 1, backgroundColor: theme.colors.card, padding: theme.spacing.lg, borderRadius: 16, marginHorizontal: 4, alignItems: 'center', shadowColor: theme.colors.accent, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 }}
          >
            <Animated.Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.background }}>
              {statsAnimations[2]}
            </Animated.Text>
            <Text style={{ fontSize: 12, color: theme.colors.background + 'CC', marginTop: 4 }}>This Week</Text>
          </LinearGradient>
        </View>

        {/* Workout Types */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.primary, marginBottom: theme.spacing.md }}>
            Workout Types
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {workoutTypes.map((type) => (
              <TouchableOpacity
                key={type.name}
                onPress={() => handleWorkoutTypePress(type.name.toLowerCase())}
                style={{
                  flex: 1,
                  backgroundColor: selectedType === type.name.toLowerCase() ? type.color : theme.colors.card,
                  padding: theme.spacing.md,
                  borderRadius: 12,
                  marginHorizontal: 4,
                  alignItems: 'center',
                  shadowColor: type.color,
                  shadowOpacity: selectedType === type.name.toLowerCase() ? 0.2 : 0.05,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <MaterialCommunityIcons
                  name={type.icon as any}
                  size={24}
                  color={selectedType === type.name.toLowerCase() ? theme.colors.background : type.color}
                />
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: selectedType === type.name.toLowerCase() ? theme.colors.background : theme.colors.text,
                  marginTop: 4,
                }}>
                  {type.name}
                </Text>
                <Text style={{
                  fontSize: 10,
                  color: selectedType === type.name.toLowerCase() ? theme.colors.background + 'CC' : theme.colors.textSecondary,
                }}>
                  {type.count} workouts
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Workouts */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.primary, marginBottom: theme.spacing.md }}>
            Upcoming Workouts
          </Text>
          {workouts.map((workout, index) => (
            <LinearGradient
              key={workout.id}
              colors={[theme.colors.card, theme.colors.card + 'DD']}
              style={{
                borderRadius: 16,
                padding: theme.spacing.lg,
                marginBottom: theme.spacing.md,
                shadowColor: getWorkoutColor(workout.type),
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.sm }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: getWorkoutColor(workout.type) + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: theme.spacing.md,
                  }}>
                    <MaterialCommunityIcons
                      name={getWorkoutIcon(workout.type) as any}
                      size={24}
                      color={getWorkoutColor(workout.type)}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text, marginBottom: 2 }}>
                      {workout.name}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginRight: 12 }}>
                        ⏱️ {workout.duration}
                      </Text>
                      <Text style={{ fontSize: 12, color: theme.colors.textSecondary, marginRight: 12 }}>
                        🔥 {workout.calories} cal
                      </Text>
                      <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                        📅 {workout.date}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  backgroundColor: workout.completed ? theme.colors.success : theme.colors.warning,
                }}>
                  <Text style={{ fontSize: 10, fontWeight: '500', color: theme.colors.background }}>
                    {workout.completed ? 'Completed' : workout.difficulty}
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={{ marginTop: theme.spacing.sm }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>Progress</Text>
                  <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>{workout.progress}%</Text>
                </View>
                <View style={{
                  height: 6,
                  backgroundColor: theme.colors.border,
                  borderRadius: 3,
                  overflow: 'hidden',
                }}>
                  <Animated.View style={{
                    height: '100%',
                    width: progressAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: getWorkoutColor(workout.type),
                    borderRadius: 3,
                  }} />
                </View>
              </View>

              {!workout.completed && (
                <TouchableOpacity
                  onPress={() => handleStartWorkout(workout.id)}
                  style={{
                    backgroundColor: getWorkoutColor(workout.type),
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                    marginTop: theme.spacing.sm,
                  }}
                >
                  <Text style={{ color: theme.colors.background, fontWeight: '600', fontSize: 14 }}>
                    Start Workout
                  </Text>
                </TouchableOpacity>
              )}
            </LinearGradient>
          ))}
        </View>

        {/* Quick Actions */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.accent, marginBottom: theme.spacing.md }}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {workoutTypes.map((type) => (
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
                  {type.name}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center' }}>
                  {type.count} workouts available
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 