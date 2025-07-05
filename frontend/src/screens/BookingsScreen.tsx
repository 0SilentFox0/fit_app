import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../ThemeProvider';

const { width } = Dimensions.get('window');

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  price: number;
  availableSlots: TimeSlot[];
}

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  duration: number;
  isAvailable: boolean;
  trainerId: string;
}

interface Booking {
  id: string;
  trainerId: string;
  trainerName: string;
  date: string;
  time: string;
  duration: number;
  sessionType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  progress?: number;
  exercises?: Exercise[];
}

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export const BookingsScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'history'>('upcoming');
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [sessionType, setSessionType] = useState('strength');

  const trainers: Trainer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialty: 'Strength Training',
      avatar: '💪',
      rating: 4.9,
      price: 75,
      availableSlots: [
        { id: '1', date: '2024-01-15', time: '09:00', duration: 60, isAvailable: true, trainerId: '1' },
        { id: '2', date: '2024-01-15', time: '10:30', duration: 60, isAvailable: true, trainerId: '1' },
        { id: '3', date: '2024-01-15', time: '14:00', duration: 60, isAvailable: false, trainerId: '1' },
        { id: '4', date: '2024-01-16', time: '09:00', duration: 60, isAvailable: true, trainerId: '1' },
        { id: '5', date: '2024-01-16', time: '11:00', duration: 60, isAvailable: true, trainerId: '1' },
      ],
    },
    {
      id: '2',
      name: 'Mike Chen',
      specialty: 'Cardio & HIIT',
      avatar: '🏃',
      rating: 4.8,
      price: 65,
      availableSlots: [
        { id: '6', date: '2024-01-15', time: '08:00', duration: 45, isAvailable: true, trainerId: '2' },
        { id: '7', date: '2024-01-15', time: '16:00', duration: 45, isAvailable: true, trainerId: '2' },
        { id: '8', date: '2024-01-16', time: '07:30', duration: 45, isAvailable: true, trainerId: '2' },
      ],
    },
    {
      id: '3',
      name: 'Emma Davis',
      specialty: 'Yoga & Flexibility',
      avatar: '🧘',
      rating: 4.9,
      price: 70,
      availableSlots: [
        { id: '9', date: '2024-01-15', time: '18:00', duration: 90, isAvailable: true, trainerId: '3' },
        { id: '10', date: '2024-01-16', time: '19:00', duration: 90, isAvailable: true, trainerId: '3' },
      ],
    },
  ];

  const bookings: Booking[] = [
    {
      id: '1',
      trainerId: '1',
      trainerName: 'Sarah Johnson',
      date: '2024-01-15',
      time: '09:00',
      duration: 60,
      sessionType: 'Strength Training',
      status: 'upcoming',
      progress: 0,
    },
    {
      id: '2',
      trainerId: '2',
      trainerName: 'Mike Chen',
      date: '2024-01-10',
      time: '08:00',
      duration: 45,
      sessionType: 'HIIT Cardio',
      status: 'completed',
      progress: 100,
      exercises: [
        { name: 'Bench Press', sets: 3, reps: 10, weight: 135 },
        { name: 'Squats', sets: 4, reps: 12, weight: 185 },
        { name: 'Deadlifts', sets: 3, reps: 8, weight: 225 },
      ],
    },
    {
      id: '3',
      trainerId: '3',
      trainerName: 'Emma Davis',
      date: '2024-01-08',
      time: '18:00',
      duration: 90,
      sessionType: 'Yoga Flow',
      status: 'completed',
      progress: 100,
      exercises: [
        { name: 'Sun Salutation', sets: 5, reps: 1, weight: 0 },
        { name: 'Warrior Poses', sets: 3, reps: 1, weight: 0 },
        { name: 'Tree Pose', sets: 2, reps: 1, weight: 0 },
      ],
    },
  ];

  const sessionTypes = [
    { id: 'strength', name: 'Strength Training', icon: 'fitness' },
    { id: 'cardio', name: 'Cardio & HIIT', icon: 'heart' },
    { id: 'yoga', name: 'Yoga & Flexibility', icon: 'leaf' },
    { id: 'pilates', name: 'Pilates', icon: 'body' },
    { id: 'crossfit', name: 'CrossFit', icon: 'flash' },
  ];

  const handleBookSession = () => {
    if (selectedSlot && selectedTrainer) {
      Alert.alert(
        'Confirm Booking',
        `Book ${sessionType} session with ${selectedTrainer.name} on ${selectedSlot.date} at ${selectedSlot.time}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Book', onPress: () => {
            setShowBookingModal(false);
            setSelectedSlot(null);
            setSelectedTrainer(null);
            Alert.alert('Success', 'Session booked successfully!');
          }},
        ]
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return colors.primary;
      case 'completed': return colors.success;
      case 'cancelled': return colors.destructive;
      default: return colors.mutedForeground;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.chart1]}
        style={styles.headerGradient}
      >
        <Text style={[styles.headerTitle, { color: colors.primaryForeground }]}>
          Book Sessions
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.primaryForeground }]}>
          Schedule your training sessions
        </Text>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'upcoming' && { backgroundColor: colors.primary }
          ]}
          onPress={() => setSelectedTab('upcoming')}
        >
          <Text style={[
            styles.tabText,
            { color: selectedTab === 'upcoming' ? colors.primaryForeground : colors.foreground }
          ]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'history' && { backgroundColor: colors.primary }
          ]}
          onPress={() => setSelectedTab('history')}
        >
          <Text style={[
            styles.tabText,
            { color: selectedTab === 'history' ? colors.primaryForeground : colors.foreground }
          ]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === 'upcoming' ? (
          <>
            {/* Available Trainers */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Available Trainers
              </Text>
              {trainers.map((trainer) => (
                <TouchableOpacity
                  key={trainer.id}
                  style={[styles.trainerCard, { backgroundColor: colors.card }]}
                  onPress={() => setSelectedTrainer(trainer)}
                >
                  <View style={styles.cardTrainerInfo}>
                    <Text style={styles.trainerAvatar}>{trainer.avatar}</Text>
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
                        <Text style={[styles.trainerPrice, { color: colors.primary }]}>
                          ${trainer.price}/session
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Upcoming Bookings */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Upcoming Sessions
              </Text>
              {bookings.filter(b => b.status === 'upcoming').map((booking) => (
                <View key={booking.id} style={[styles.bookingCard, { backgroundColor: colors.card }]}>
                  <View style={styles.bookingHeader}>
                    <Text style={[styles.bookingTrainer, { color: colors.foreground }]}>
                      {booking.trainerName}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                        {booking.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.bookingDetails, { color: colors.mutedForeground }]}>
                    {formatDate(booking.date)} at {formatTime(booking.time)} • {booking.duration}min
                  </Text>
                  <Text style={[styles.bookingType, { color: colors.foreground }]}>
                    {booking.sessionType}
                  </Text>
                  {booking.progress !== undefined && (
                    <View style={styles.progressContainer}>
                      <Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>Session Progress</Text>
                      <Text style={[styles.progressValue, { color: colors.primary }]}>{booking.progress}%</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </>
        ) : (
          /* Booking History */
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Training History
            </Text>
            {bookings.filter(b => b.status === 'completed').map((booking) => (
              <View key={booking.id} style={[styles.bookingCard, { backgroundColor: colors.card }]}>
                <View style={styles.bookingHeader}>
                  <Text style={[styles.bookingTrainer, { color: colors.foreground }]}>
                    {booking.trainerName}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
                    <Text style={[styles.statusText, { color: colors.success }]}>
                      Completed
                    </Text>
                  </View>
                </View>
                <Text style={[styles.bookingDetails, { color: colors.mutedForeground }]}>
                  {formatDate(booking.date)} at {formatTime(booking.time)} • {booking.duration}min
                </Text>
                <Text style={[styles.bookingType, { color: colors.foreground }]}>
                  {booking.sessionType}
                </Text>
                
                {/* Exercise Progress */}
                {booking.exercises && (
                  <View style={styles.exercisesContainer}>
                    <Text style={[styles.exercisesTitle, { color: colors.foreground }]}>
                      Exercises Completed
                    </Text>
                    {booking.exercises.map((exercise, index) => (
                      <View key={index} style={styles.exerciseItem}>
                        <Text style={[styles.exerciseName, { color: colors.foreground }]}>
                          {exercise.name}
                        </Text>
                        <Text style={[styles.exerciseDetails, { color: colors.mutedForeground }]}>
                          {exercise.sets} sets × {exercise.reps} reps
                          {exercise.weight > 0 && ` @ ${exercise.weight}lbs`}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.foreground }]}>
                Book Session
              </Text>
              <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                <Ionicons name="close" size={24} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>

            {selectedTrainer && (
              <>
                <View style={styles.modalTrainerInfo}>
                  <Text style={styles.trainerAvatar}>{selectedTrainer.avatar}</Text>
                  <View>
                    <Text style={[styles.modalTrainerName, { color: colors.foreground }]}>
                      {selectedTrainer.name}
                    </Text>
                    <Text style={[styles.modalTrainerSpecialty, { color: colors.mutedForeground }]}>
                      {selectedTrainer.specialty}
                    </Text>
                  </View>
                </View>

                {/* Session Type Selection */}
                <View style={styles.sessionTypeContainer}>
                  <Text style={[styles.sessionTypeTitle, { color: colors.foreground }]}>
                    Session Type
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {sessionTypes.map((type) => (
                      <TouchableOpacity
                        key={type.id}
                        style={[
                          styles.sessionTypeButton,
                          sessionType === type.id && { backgroundColor: colors.primary }
                        ]}
                        onPress={() => setSessionType(type.id)}
                      >
                        <Ionicons
                          name={type.icon as any}
                          size={20}
                          color={sessionType === type.id ? colors.primaryForeground : colors.foreground}
                        />
                        <Text style={[
                          styles.sessionTypeText,
                          { color: sessionType === type.id ? colors.primaryForeground : colors.foreground }
                        ]}>
                          {type.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* Available Slots */}
                <View style={styles.slotsContainer}>
                  <Text style={[styles.slotsTitle, { color: colors.foreground }]}>
                    Available Slots
                  </Text>
                  <View style={styles.slotsGrid}>
                    {selectedTrainer.availableSlots
                      .filter(slot => slot.isAvailable)
                      .map((slot) => (
                        <TouchableOpacity
                          key={slot.id}
                          style={[
                            styles.slotButton,
                            selectedSlot?.id === slot.id && { backgroundColor: colors.primary }
                          ]}
                          onPress={() => setSelectedSlot(slot)}
                        >
                          <Text style={[
                            styles.slotText,
                            { color: selectedSlot?.id === slot.id ? colors.primaryForeground : colors.foreground }
                          ]}>
                            {formatDate(slot.date)}
                          </Text>
                          <Text style={[
                            styles.slotTime,
                            { color: selectedSlot?.id === slot.id ? colors.primaryForeground : colors.mutedForeground }
                          ]}>
                            {slot.time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.bookButton, { backgroundColor: colors.primary }]}
                  onPress={handleBookSession}
                  disabled={!selectedSlot}
                >
                  <Text style={[styles.bookButtonText, { color: colors.primaryForeground }]}>
                    Book Session
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Quick Book Button */}
      <TouchableOpacity
        style={[styles.quickBookButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowBookingModal(true)}
      >
        <Ionicons name="add" size={24} color={colors.primaryForeground} />
        <Text style={[styles.quickBookText, { color: colors.primaryForeground }]}>
          Quick Book
        </Text>
      </TouchableOpacity>
    </View>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
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
  cardTrainerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainerAvatar: {
    fontSize: 32,
    marginRight: 12,
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
  trainerPrice: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingTrainer: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  bookingDetails: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookingType: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  progressLabel: {
    fontSize: 12,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  exercisesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  exercisesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  exerciseItem: {
    marginBottom: 6,
  },
  exerciseName: {
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseDetails: {
    fontSize: 11,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalTrainerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTrainerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalTrainerSpecialty: {
    fontSize: 14,
  },
  sessionTypeContainer: {
    marginBottom: 20,
  },
  sessionTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sessionTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  sessionTypeText: {
    fontSize: 12,
    marginLeft: 8,
  },
  slotsContainer: {
    marginBottom: 20,
  },
  slotsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slotButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  slotText: {
    fontSize: 12,
    fontWeight: '500',
  },
  slotTime: {
    fontSize: 10,
    marginTop: 2,
  },
  bookButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quickBookButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  quickBookText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 