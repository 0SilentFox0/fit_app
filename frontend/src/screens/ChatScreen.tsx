import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../ThemeProvider';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'trainer';
  timestamp: Date;
  trainerId?: string;
}

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  isOnline: boolean;
  lastSeen: string;
}

export const ChatScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const trainers: Trainer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialty: 'Strength Training',
      avatar: '💪',
      rating: 4.9,
      isOnline: true,
      lastSeen: '2 min ago',
    },
    {
      id: '2',
      name: 'Mike Chen',
      specialty: 'Cardio & HIIT',
      avatar: '🏃',
      rating: 4.8,
      isOnline: true,
      lastSeen: '5 min ago',
    },
    {
      id: '3',
      name: 'Emma Davis',
      specialty: 'Yoga & Flexibility',
      avatar: '🧘',
      rating: 4.9,
      isOnline: false,
      lastSeen: '1 hour ago',
    },
    {
      id: '4',
      name: 'Alex Rodriguez',
      specialty: 'CrossFit',
      avatar: '🔥',
      rating: 4.7,
      isOnline: true,
      lastSeen: '1 min ago',
    },
  ];

  const quickMessages = [
    'Can you help me with my form?',
    'What should I eat before training?',
    'I need a new workout plan',
    'How do I improve my strength?',
    'Can we schedule a session?',
  ];

  useEffect(() => {
    if (selectedTrainer) {
      // Load chat history for selected trainer
      const mockMessages: Message[] = [
        {
          id: '1',
          text: `Hi! I'm ${selectedTrainer.name}, your ${selectedTrainer.specialty} trainer. How can I help you today?`,
          sender: 'trainer',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          trainerId: selectedTrainer.id,
        },
        {
          id: '2',
          text: 'Hi! I need help with my workout routine.',
          sender: 'user',
          timestamp: new Date(Date.now() - 1000 * 60 * 25),
        },
        {
          id: '3',
          text: 'Great! I can help you create a personalized routine. What are your current fitness goals?',
          sender: 'trainer',
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          trainerId: selectedTrainer.id,
        },
      ];
      setMessages(mockMessages);
    }
  }, [selectedTrainer]);

  const sendMessage = () => {
    if (inputText.trim() && selectedTrainer) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Simulate trainer response
      setTimeout(() => {
        const trainerResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for your message! I\'ll get back to you soon with a detailed response.',
          sender: 'trainer',
          timestamp: new Date(),
          trainerId: selectedTrainer.id,
        };
        setMessages(prev => [...prev, trainerResponse]);
      }, 2000);
    }
  };

  const sendQuickMessage = (text: string) => {
    setInputText(text);
    // Auto-send after a short delay
    setTimeout(() => {
      sendMessage();
    }, 500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessage : styles.trainerMessage,
    ]}>
      <View style={[
        styles.messageBubble,
        {
          backgroundColor: item.sender === 'user' ? colors.primary : colors.card,
          borderColor: item.sender === 'user' ? colors.primary : colors.border,
        },
      ]}>
        <Text style={[
          styles.messageText,
          {
            color: item.sender === 'user' ? colors.primaryForeground : colors.foreground,
          },
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.messageTime,
          {
            color: item.sender === 'user' ? colors.primaryForeground + '80' : colors.mutedForeground,
          },
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  if (!selectedTrainer) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.chart1]}
          style={styles.headerGradient}
        >
          <Text style={[styles.headerTitle, { color: colors.primaryForeground }]}>
            Chat with Trainers
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.primaryForeground }]}>
            Connect with your fitness experts
          </Text>
        </LinearGradient>

        {/* Trainers List */}
        <ScrollView style={styles.trainersContainer}>
          {trainers.map((trainer) => (
            <TouchableOpacity
              key={trainer.id}
              style={[styles.trainerCard, { backgroundColor: colors.card }]}
              onPress={() => setSelectedTrainer(trainer)}
            >
              <View style={styles.trainerInfo}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>{trainer.avatar}</Text>
                  <View style={[
                    styles.onlineIndicator,
                    { backgroundColor: trainer.isOnline ? colors.success : colors.mutedForeground },
                  ]} />
                </View>
                <View style={styles.trainerDetails}>
                  <Text style={[styles.trainerName, { color: colors.foreground }]}>
                    {trainer.name}
                  </Text>
                  <Text style={[styles.trainerSpecialty, { color: colors.mutedForeground }]}>
                    {trainer.specialty}
                  </Text>
                  <View style={styles.trainerStats}>
                    <Ionicons name="star" size={12} color={colors.warning} />
                    <Text style={[styles.trainerRating, { color: colors.mutedForeground }]}>
                      {trainer.rating}
                    </Text>
                    <Text style={[styles.trainerStatus, { color: colors.mutedForeground }]}>
                      {trainer.isOnline ? 'Online' : `Last seen ${trainer.lastSeen}`}
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Chat Header */}
      <LinearGradient
        colors={[colors.primary, colors.chart1]}
        style={styles.chatHeader}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedTrainer(null)}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primaryForeground} />
        </TouchableOpacity>
        <View style={styles.chatTrainerInfo}>
          <Text style={styles.avatarText}>{selectedTrainer.avatar}</Text>
          <View style={styles.chatTrainerDetails}>
            <Text style={[styles.chatTrainerName, { color: colors.primaryForeground }]}>
              {selectedTrainer.name}
            </Text>
            <Text style={[styles.chatTrainerStatus, { color: colors.primaryForeground }]}>
              {selectedTrainer.isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.primaryForeground} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Quick Messages */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickMessagesContainer}
        contentContainerStyle={styles.quickMessagesContent}
      >
        {quickMessages.map((message, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickMessageButton, { backgroundColor: colors.card }]}
            onPress={() => sendQuickMessage(message)}
          >
            <Text style={[styles.quickMessageText, { color: colors.foreground }]}>
              {message}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
        <TextInput
          style={[styles.textInput, { color: colors.foreground }]}
          placeholder="Type a message..."
          placeholderTextColor={colors.mutedForeground}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: colors.primary }]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputText.trim() ? colors.primaryForeground : colors.mutedForeground}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  trainersContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  trainerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trainerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 32,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  trainerDetails: {
    flex: 1,
  },
  trainerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  trainerSpecialty: {
    fontSize: 14,
    marginBottom: 4,
  },
  trainerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainerRating: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 8,
  },
  trainerStatus: {
    fontSize: 12,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 16,
  },
  chatTrainerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatTrainerDetails: {
    marginLeft: 12,
  },
  chatTrainerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  chatTrainerStatus: {
    fontSize: 12,
    opacity: 0.8,
  },
  moreButton: {
    marginLeft: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 12,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  trainerMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  quickMessagesContainer: {
    maxHeight: 60,
    paddingHorizontal: 20,
  },
  quickMessagesContent: {
    paddingVertical: 8,
  },
  quickMessageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  quickMessageText: {
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 12,
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 