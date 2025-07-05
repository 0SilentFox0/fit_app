import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from './ThemeProvider';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { HomeScreen } from './screens/HomeScreen';
import { WorkoutsScreen } from './screens/WorkoutsScreen';
import { BookingsScreen } from './screens/BookingsScreen';
import { ChatScreen } from './screens/ChatScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressScreen } from './screens/ProgressScreen';

const Tab = createBottomTabNavigator();

// Placeholder for ActivityScreen
const ActivityScreen = () => <View style={{ flex: 1, backgroundColor: '#181A20' }} />;

export const TabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: Platform.OS === 'ios' ? 32 : 16,
            borderRadius: 32,
            height: 64,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            shadowColor: theme.colors.primary,
            shadowOpacity: 0.15,
            shadowRadius: 16,
          },
        ],
        tabBarBackground: () => (
          <LinearGradient
            colors={theme.colors.glassGradient as [string, string]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === 'Home') {
            icon = <Ionicons name="person-circle" size={28} color={focused ? theme.colors.primary : theme.colors.tabInactive} />;
          } else if (route.name === 'Progress') {
            icon = <Ionicons name="trending-up" size={26} color={focused ? theme.colors.primary : theme.colors.tabInactive} />;
          } else if (route.name === 'Workouts') {
            icon = <MaterialCommunityIcons name="dumbbell" size={26} color={focused ? theme.colors.primary : theme.colors.tabInactive} />;
          } else if (route.name === 'Activity') {
            icon = <Ionicons name="heart" size={26} color={focused ? theme.colors.primary : theme.colors.tabInactive} />;
          } else if (route.name === 'Chat') {
            icon = <Ionicons name="chatbubble-ellipses" size={26} color={focused ? theme.colors.primary : theme.colors.tabInactive} />;
          } else if (route.name === 'Calendar') {
            icon = <FontAwesome5 name="calendar-alt" size={24} color={focused ? theme.colors.primary : theme.colors.tabInactive} />;
          }
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 2 }}>
              {icon}
              <View style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: focused ? theme.colors.primary : 'transparent',
                marginTop: 4,
              }} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Calendar" component={BookingsScreen} />
    </Tab.Navigator>
  );
}; 