import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, BarChart } from 'react-native-gifted-charts';
import { useTheme } from '../ThemeProvider';

const { width } = Dimensions.get('window');

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  calories: number;
  date: string;
}

interface TrainingSession {
  id: string;
  date: string;
  duration: number;
  totalCalories: number;
  exercises: Exercise[];
  trainerName: string;
  sessionType: string;
}

export const TrainingHistoryScreen: React.FC = () => {
  const { colors } = useTheme();
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockSessions: TrainingSession[] = [
      {
        id: '1',
        date: '2024-06-15',
        duration: 45,
        totalCalories: 320,
        trainerName: 'Mike Johnson',
        sessionType: 'Strength Training',
        exercises: [
          { id: '1', name: 'Bench Press', sets: 3, reps: 10, weight: 135, calories: 45, date: '2024-06-15' },
          { id: '2', name: 'Squats', sets: 4, reps: 12, weight: 185, calories: 60, date: '2024-06-15' },
          { id: '3', name: 'Deadlifts', sets: 3, reps: 8, weight: 225, calories: 75, date: '2024-06-15' },
          { id: '4', name: 'Pull-ups', sets: 3, reps: 8, weight: 0, calories: 30, date: '2024-06-15' },
        ]
      },
      {
        id: '2',
        date: '2024-06-12',
        duration: 30,
        totalCalories: 280,
        trainerName: 'Sarah Wilson',
        sessionType: 'Cardio',
        exercises: [
          { id: '5', name: 'Treadmill', sets: 1, reps: 1, weight: 0, calories: 150, date: '2024-06-12' },
          { id: '6', name: 'Rowing', sets: 1, reps: 1, weight: 0, calories: 80, date: '2024-06-12' },
          { id: '7', name: 'Burpees', sets: 3, reps: 15, weight: 0, calories: 50, date: '2024-06-12' },
        ]
      },
      {
        id: '3',
        date: '2024-06-08',
        duration: 50,
        totalCalories: 380,
        trainerName: 'Mike Johnson',
        sessionType: 'Strength Training',
        exercises: [
          { id: '8', name: 'Bench Press', sets: 4, reps: 8, weight: 155, calories: 55, date: '2024-06-08' },
          { id: '9', name: 'Squats', sets: 4, reps: 10, weight: 195, calories: 70, date: '2024-06-08' },
          { id: '10', name: 'Military Press', sets: 3, reps: 10, weight: 95, calories: 45, date: '2024-06-08' },
          { id: '11', name: 'Bent Over Rows', sets: 3, reps: 12, weight: 115, calories: 40, date: '2024-06-08' },
        ]
      }
    ];
    
    setSessions(mockSessions);
    setLoading(false);
  }, []);

  const getExerciseProgress = (exerciseName: string) => {
    const exerciseHistory = sessions
      .flatMap(session => session.exercises)
      .filter(exercise => exercise.name === exerciseName)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return exerciseHistory.map((exercise, index) => ({
      value: exercise.weight || exercise.reps,
      label: `Session ${index + 1}`,
      dataPointText: exercise.weight ? `${exercise.weight}lbs` : `${exercise.reps} reps`,
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.foreground }]}>Loading training history...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>Training History</Text>
      
      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>{sessions.length}</Text>
          <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Total Sessions</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>
            {sessions.reduce((total, session) => total + session.totalCalories, 0)}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Total Calories</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>
            {Math.round(sessions.reduce((total, session) => total + session.duration, 0) / sessions.length)}min
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>Avg Duration</Text>
        </View>
      </View>

      {/* Training Sessions */}
      <View style={styles.sessionsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Sessions</Text>
        {sessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={[styles.sessionCard, { backgroundColor: colors.card }]}
            onPress={() => setSelectedSession(selectedSession?.id === session.id ? null : session)}
          >
            <View style={styles.sessionHeader}>
              <View>
                <Text style={[styles.sessionDate, { color: colors.foreground }]}>
                  {formatDate(session.date)}
                </Text>
                <Text style={[styles.sessionType, { color: colors.mutedForeground }]}>
                  {session.sessionType} with {session.trainerName}
                </Text>
              </View>
              <View style={styles.sessionStats}>
                <Text style={[styles.sessionDuration, { color: colors.primary }]}>
                  {session.duration}min
                </Text>
                <Text style={[styles.sessionCalories, { color: colors.success }]}>
                  {session.totalCalories} cal
                </Text>
              </View>
            </View>

            {selectedSession?.id === session.id && (
              <View style={styles.exercisesContainer}>
                <Text style={[styles.exercisesTitle, { color: colors.foreground }]}>Exercises</Text>
                {session.exercises.map((exercise) => (
                  <View key={exercise.id} style={styles.exerciseItem}>
                    <View style={styles.exerciseHeader}>
                      <Text style={[styles.exerciseName, { color: colors.foreground }]}>
                        {exercise.name}
                      </Text>
                      <Text style={[styles.exerciseCalories, { color: colors.success }]}>
                        {exercise.calories} cal
                      </Text>
                    </View>
                    <Text style={[styles.exerciseDetails, { color: colors.mutedForeground }]}>
                      {exercise.sets} sets × {exercise.reps} reps
                      {exercise.weight > 0 && ` @ ${exercise.weight}lbs`}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Exercise Progress Charts */}
      <View style={styles.chartsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Exercise Progress</Text>
        
        {/* Bench Press Progress */}
        <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.chartTitle, { color: colors.foreground }]}>Bench Press Progress</Text>
          <LineChart
            data={getExerciseProgress('Bench Press')}
            width={width - 80}
            height={120}
            color={colors.primary}
            thickness={2}
            startFillColor={colors.primary + '20'}
            endFillColor={colors.primary + '20'}
            areaChart
            curved
            dataPointsColor={colors.primary}
            dataPointsRadius={4}
            yAxisColor={colors.mutedForeground}
            xAxisColor={colors.mutedForeground}
            yAxisTextStyle={{ color: colors.mutedForeground }}
            xAxisLabelTextStyle={{ color: colors.mutedForeground }}
          />
        </View>

        {/* Squats Progress */}
        <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.chartTitle, { color: colors.foreground }]}>Squats Progress</Text>
          <LineChart
            data={getExerciseProgress('Squats')}
            width={width - 80}
            height={120}
            color={colors.chart1}
            thickness={2}
            startFillColor={colors.chart1 + '20'}
            endFillColor={colors.chart1 + '20'}
            areaChart
            curved
            dataPointsColor={colors.chart1}
            dataPointsRadius={4}
            yAxisColor={colors.mutedForeground}
            xAxisColor={colors.mutedForeground}
            yAxisTextStyle={{ color: colors.mutedForeground }}
            xAxisLabelTextStyle={{ color: colors.mutedForeground }}
          />
        </View>

        {/* Calories Chart */}
        <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.chartTitle, { color: colors.foreground }]}>Calories Burned</Text>
          <BarChart
            data={sessions.map((session, index) => ({
              value: session.totalCalories,
              label: `Session ${index + 1}`,
              frontColor: colors.success,
            }))}
            width={width - 80}
            height={120}
            barWidth={20}
            spacing={20}
            hideRules
            xAxisColor={colors.mutedForeground}
            yAxisColor={colors.mutedForeground}
            yAxisTextStyle={{ color: colors.mutedForeground }}
            xAxisLabelTextStyle={{ color: colors.mutedForeground }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  sessionsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sessionCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  sessionType: {
    fontSize: 14,
  },
  sessionStats: {
    alignItems: 'flex-end',
  },
  sessionDuration: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  sessionCalories: {
    fontSize: 12,
    fontWeight: '500',
  },
  exercisesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  exercisesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  exerciseItem: {
    marginBottom: 12,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: '500',
  },
  exerciseCalories: {
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseDetails: {
    fontSize: 12,
  },
  chartsContainer: {
    marginBottom: 24,
  },
  chartCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
}); 