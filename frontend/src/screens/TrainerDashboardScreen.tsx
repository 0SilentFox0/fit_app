import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../ThemeProvider';

export const TrainerDashboardScreen: React.FC = () => {
  console.log('TrainerDashboardScreen: Component rendering');
  
  try {
    const { colors } = useTheme();
    console.log('TrainerDashboardScreen: useTheme hook called successfully');
    
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Trainer Dashboard</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Test Component</Text>
      </View>
    );
  } catch (error) {
    console.error('TrainerDashboardScreen: Error in useTheme hook:', error);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error loading theme</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 