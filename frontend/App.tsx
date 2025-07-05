import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { WorkoutsScreen } from './src/screens/WorkoutsScreen';
import { BookingsScreen } from './src/screens/BookingsScreen';
import { TrainersScreen } from './src/screens/TrainersScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { apiService } from './src/services/api';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/ThemeProvider';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    apiService.testConnection().then((isConnected) => {
      if (isConnected) {
        console.log('🎉 API connection established!');
      } else {
        console.log('⚠️ Could not connect to API');
        Alert.alert(
          'Connection Warning',
          'Could not connect to the backend server. Please check if the server is running.',
          [{ text: 'OK' }]
        );
      }
    });
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password });
      console.log('Login successful:', response);
      Alert.alert('Success', 'Login successful!');
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
      throw error;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Alert.alert('Logged Out', 'You have been successfully logged out.');
  };

  const handleSignup = () => {
    console.log('Navigate to signup screen');
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password screen');
  };

  return (
    <ThemeProvider>
      <StatusBar style="light" backgroundColor="#181A20" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Home">
                {({ navigation }) => (
                  <HomeScreen navigation={navigation} onLogout={handleLogout} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Workouts">
                {({ navigation }) => (
                  <WorkoutsScreen navigation={navigation} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Bookings">
                {({ navigation }) => (
                  <BookingsScreen navigation={navigation} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Trainers">
                {({ navigation }) => (
                  <TrainersScreen navigation={navigation} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Chat">
                {({ navigation }) => (
                  <ChatScreen navigation={navigation} />
                )}
              </Stack.Screen>
            </>
          ) : (
            <Stack.Screen name="Login">
              {() => (
                <LoginScreen
                  onLogin={handleLogin}
                  onSignup={handleSignup}
                  onForgotPassword={handleForgotPassword}
                />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
  },
});
