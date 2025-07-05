import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../ThemeProvider';
import { RadarChart } from 'react-native-gifted-charts';
import { apiService, ProgressData } from '../services/api';

const { width } = Dimensions.get('window');

export const ProgressScreen: React.FC = () => {
  const { colors } = useTheme();
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo('Starting API request...');
      
      // Try analytics endpoint first, fallback to client progress
      let response;
      let endpoint = '';
      try {
        endpoint = '/analytics/progress';
        setDebugInfo(`Trying ${endpoint}...`);
        response = await apiService.getProgress();
        setDebugInfo(`✅ ${endpoint} successful`);
      } catch (analyticsError) {
        setDebugInfo(`❌ ${endpoint} failed, trying client progress...`);
        endpoint = '/clients/progress';
        response = await apiService.getClientProgress();
        setDebugInfo(`✅ ${endpoint} successful`);
      }
      
      if (response.success && response.data) {
        setProgressData(response.data);
        setDebugInfo(`✅ Data loaded: ${response.data.labels.length} metrics`);
      } else {
        setDebugInfo('⚠️ API returned empty data, using fallback');
        // Fallback to mock data if API returns empty or error
        setProgressData({
          userStats: [80, 65, 90, 70, 60, 75],
          averageStats: [60, 55, 70, 60, 50, 65],
          labels: ['Strength', 'Cardio', 'Flexibility', 'Balance', 'Endurance', 'Speed'],
          userPercentile: 56,
          trending: 5.2,
          timeRange: 'January - June 2024'
        });
      }
    } catch (err) {
      console.error('Failed to fetch progress data:', err);
      setError('Failed to load progress data');
      setDebugInfo(`❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      // Set fallback data
      setProgressData({
        userStats: [80, 65, 90, 70, 60, 75],
        averageStats: [60, 55, 70, 60, 50, 65],
        labels: ['Strength', 'Cardio', 'Flexibility', 'Balance', 'Endurance', 'Speed'],
        userPercentile: 56,
        trending: 5.2,
        timeRange: 'January - June 2024'
      });
    } finally {
      setLoading(false);
    }
  };

  const showDebugInfo = () => {
    Alert.alert(
      'Debug Information',
      `Status: ${loading ? 'Loading' : error ? 'Error' : 'Success'}\n\n${debugInfo}`,
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.foreground }]}>Loading progress data...</Text>
        <TouchableOpacity onPress={showDebugInfo} style={styles.debugButton}>
          <Text style={[styles.debugText, { color: colors.primary }]}>Show Debug Info</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (error && !progressData) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
        <TouchableOpacity onPress={fetchProgressData} style={styles.retryButton}>
          <Text style={[styles.retryText, { color: colors.primary }]}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showDebugInfo} style={styles.debugButton}>
          <Text style={[styles.debugText, { color: colors.primary }]}>Show Debug Info</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!progressData) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.errorText, { color: colors.foreground }]}>No progress data available</Text>
        <TouchableOpacity onPress={fetchProgressData} style={styles.retryButton}>
          <Text style={[styles.retryText, { color: colors.primary }]}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>  
      {/* Debug button */}
      <TouchableOpacity onPress={showDebugInfo} style={styles.debugButton}>
        <Text style={[styles.debugText, { color: colors.primary }]}>Debug</Text>
      </TouchableOpacity>
      
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>  
        <Text style={[styles.title, { color: colors.foreground }]}>Radar Chart - Legend</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Showing your progress vs. average for the last 6 months</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chartOverlay}>
            <RadarChart
              data={progressData.averageStats}
              labels={progressData.labels}
              chartSize={220}
              maxValue={100}
              noOfSections={5}
              polygonConfig={{
                stroke: colors.muted,
                fill: colors.muted + '99',
              }}
              gridConfig={{
                stroke: colors.mutedForeground,
              }}
              labelConfig={{
                fontSize: 13,
                stroke: colors.mutedForeground,
              }}
            />
            <RadarChart
              data={progressData.userStats}
              labels={progressData.labels}
              chartSize={220}
              maxValue={100}
              noOfSections={5}
              polygonConfig={{
                stroke: colors.primary,
                fill: colors.primary + 'CC',
              }}
              gridConfig={{
                stroke: 'transparent',
              }}
              labelConfig={{
                fontSize: 13,
                stroke: 'transparent',
              }}
            />
          </View>
        </View>
        {/* Legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.legendLabel, { color: colors.foreground }]}>You</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.muted }]} />
            <Text style={[styles.legendLabel, { color: colors.foreground }]}>Average</Text>
          </View>
        </View>
        {/* Trending and Percentile */}
        <View style={styles.trendingRow}>
          <Text style={[styles.trendingText, { color: colors.success }]}>Trending up by {progressData.trending}% this month</Text>
          <Text style={[styles.percentileText, { color: colors.primary }]}>Your progress is higher than {progressData.userPercentile}% of users</Text>
        </View>
        <Text style={[styles.rangeText, { color: colors.mutedForeground }]}>{progressData.timeRange}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 12,
  },
  chartContainer: {
    marginBottom: 12,
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  trendingRow: {
    alignItems: 'center',
    marginBottom: 8,
  },
  trendingText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  percentileText: {
    fontSize: 12,
    fontWeight: '500',
  },
  rangeText: {
    fontSize: 11,
    opacity: 0.7,
  },
  loadingText: {
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    marginTop: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  debugButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 6,
    zIndex: 1000,
  },
  debugText: {
    fontSize: 12,
    fontWeight: '500',
  },
}); 