import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { useTheme } from '../ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ChatScreenProps {
  navigation: any;
}

const conversations = [
  {
    id: '1',
    trainerName: 'Sarah Johnson',
    trainerSpecialty: 'Yoga & Pilates',
    lastMessage: 'Great session today! Your flexibility has improved significantly.',
    time: '2 hours ago',
    unreadCount: 2,
    online: true,
    avatar: '🧘‍♀️',
    rating: 4.9,
    sessions: 12,
  },
  {
    id: '2',
    trainerName: 'Mike Chen',
    trainerSpecialty: 'Strength Training',
    lastMessage: 'Ready for tomorrow\'s workout? We\'ll focus on compound movements.',
    time: 'Yesterday',
    unreadCount: 0,
    online: false,
    avatar: '💪',
    rating: 4.8,
    sessions: 8,
  },
  {
    id: '3',
    trainerName: 'Emma Davis',
    trainerSpecialty: 'Cardio & HIIT',
    lastMessage: 'Your endurance is amazing! Let\'s push it even further next time.',
    time: '3 days ago',
    unreadCount: 1,
    online: true,
    avatar: '🏃‍♀️',
    rating: 4.7,
    sessions: 15,
  },
];

const quickActions = [
  { icon: 'call', label: 'Voice Call', color: '#FF6B6B' },
  { icon: 'videocam', label: 'Video Call', color: '#4ECDC4' },
  { icon: 'camera', label: 'Send Photo', color: '#45B7D1' },
  { icon: 'analytics', label: 'Progress Report', color: '#96CEB4' },
];

const messageTemplates = [
  { icon: 'fitness', label: 'Workout Question', message: 'Hi! I have a question about today\'s workout...', color: '#FF6B6B' },
  { icon: 'calendar', label: 'Schedule Change', message: 'I need to reschedule our session...', color: '#4ECDC4' },
  { icon: 'trophy', label: 'Goal Update', message: 'I\'ve reached a new milestone...', color: '#45B7D1' },
];

export const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [activeChats, setActiveChats] = useState(3);
  const [onlineNow, setOnlineNow] = useState(2);
  const [unreadMessages, setUnreadMessages] = useState(5);

  // Animated values for stats
  const statsAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  // Chat bubble animations
  const chatAnimations = useRef(conversations.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Animate stats on mount
    statsAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: [activeChats, onlineNow, unreadMessages][index],
        duration: 1500,
        useNativeDriver: false,
      }).start();
    });

    // Animate chat bubbles
    chatAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 800 + index * 200,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const handleOpenChat = (chatId: string) => {
    console.log('Opening chat:', chatId);
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
  };

  const handleMessageTemplate = (template: any) => {
    console.log('Using template:', template.label);
  };

  const getTrainerColor = (specialty: string) => {
    if (specialty.includes('Yoga')) return '#FF6B6B';
    if (specialty.includes('Strength')) return '#4ECDC4';
    if (specialty.includes('Cardio')) return '#45B7D1';
    return theme.colors.primary;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: theme.spacing.lg }}>
        {/* Header */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 }}>
            Messages
          </Text>
          <Text style={{ fontSize: 16, color: theme.colors.textSecondary }}>
            Connect with your trainers
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
            <Text style={{ fontSize: 12, color: theme.colors.background + 'CC', marginTop: 4 }}>Active Chats</Text>
          </LinearGradient>
          <LinearGradient
            colors={[theme.colors.secondary, theme.colors.secondary + 'CC']}
            style={{ flex: 1, backgroundColor: theme.colors.card, padding: theme.spacing.lg, borderRadius: 16, marginHorizontal: 4, alignItems: 'center', shadowColor: theme.colors.secondary, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 }}
          >
            <Animated.Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.background }}>
              {statsAnimations[1]}
            </Animated.Text>
            <Text style={{ fontSize: 12, color: theme.colors.background + 'CC', marginTop: 4 }}>Online Now</Text>
          </LinearGradient>
          <LinearGradient
            colors={[theme.colors.accent, theme.colors.accent + 'CC']}
            style={{ flex: 1, backgroundColor: theme.colors.card, padding: theme.spacing.lg, borderRadius: 16, marginHorizontal: 4, alignItems: 'center', shadowColor: theme.colors.accent, shadowOpacity: 0.15, shadowRadius: 8, elevation: 3 }}
          >
            <Animated.Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.background }}>
              {statsAnimations[2]}
            </Animated.Text>
            <Text style={{ fontSize: 12, color: theme.colors.background + 'CC', marginTop: 4 }}>Unread</Text>
          </LinearGradient>
        </View>

        {/* Recent Conversations */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.primary, marginBottom: theme.spacing.md }}>
            Recent Conversations
          </Text>
          {conversations.map((conversation, index) => (
            <Animated.View
              key={conversation.id}
              style={{
                transform: [{ translateY: chatAnimations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                })}],
                opacity: chatAnimations[index],
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.card,
                  borderRadius: 16,
                  padding: theme.spacing.lg,
                  marginBottom: theme.spacing.md,
                  shadowColor: getTrainerColor(conversation.trainerSpecialty),
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
                onPress={() => handleOpenChat(conversation.id)}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}>
                  <View style={{ flexDirection: 'row', flex: 1 }}>
                    <View style={{ position: 'relative', marginRight: 12 }}>
                      <View style={{
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                        backgroundColor: getTrainerColor(conversation.trainerSpecialty) + '20',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Text style={{ fontSize: 24 }}>{conversation.avatar}</Text>
                      </View>
                      {conversation.online && (
                        <View style={{
                          position: 'absolute',
                          bottom: 2,
                          right: 2,
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: theme.colors.success,
                          borderWidth: 3,
                          borderColor: theme.colors.card,
                        }} />
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text }}>
                          {conversation.trainerName}
                        </Text>
                        <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                          {conversation.time}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginBottom: 4 }}>
                        {conversation.trainerSpecialty}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Text style={{ fontSize: 12, color: theme.colors.warning, marginRight: 4 }}>
                          ⭐ {conversation.rating}
                        </Text>
                        <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>
                          ({conversation.sessions} sessions)
                        </Text>
                      </View>
                      <Text style={{ fontSize: 14, color: theme.colors.text, lineHeight: 20 }}>
                        {conversation.lastMessage}
                      </Text>
                    </View>
                  </View>
                  {conversation.unreadCount > 0 && (
                    <View style={{
                      backgroundColor: theme.colors.accent,
                      borderRadius: 12,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      minWidth: 20,
                      alignItems: 'center',
                    }}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.colors.background }}>
                        {conversation.unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.accent, marginBottom: theme.spacing.md }}>
            Quick Actions
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={action.label}
                style={{
                  width: '48%',
                  backgroundColor: theme.colors.card,
                  padding: theme.spacing.lg,
                  borderRadius: 12,
                  marginBottom: theme.spacing.md,
                  alignItems: 'center',
                  shadowColor: action.color,
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
                onPress={() => handleQuickAction(action.label)}
              >
                <Ionicons
                  name={action.icon as any}
                  size={24}
                  color={action.color}
                  style={{ marginBottom: 8 }}
                />
                <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.text, marginBottom: 4 }}>
                  {action.label}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.textSecondary, textAlign: 'center' }}>
                  Connect instantly
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Message Templates */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.secondary, marginBottom: theme.spacing.md }}>
            Message Templates
          </Text>
          <View style={{ backgroundColor: theme.colors.card, borderRadius: 16, padding: theme.spacing.lg, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 }}>
            {messageTemplates.map((template, index) => (
              <TouchableOpacity
                key={template.label}
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: index < messageTemplates.length - 1 ? 1 : 0,
                  borderBottomColor: theme.colors.border,
                }}
                onPress={() => handleMessageTemplate(template)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <View style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: template.color + '20',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}>
                    <MaterialCommunityIcons
                      name={template.icon as any}
                      size={16}
                      color={template.color}
                    />
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text }}>
                    {template.label}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: theme.colors.textSecondary, lineHeight: 20, fontStyle: 'italic', marginLeft: 44 }}>
                  "{template.message}"
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 