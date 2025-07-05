import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../ThemeProvider';

const { width } = Dimensions.get('window');

interface CalendarEvent {
  id: string;
  title: string;
  clientName: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  sessionType: string;
  location?: string;
}

interface BookingRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  requestedDate: string;
  requestedTime: string;
  sessionType: string;
  duration: number;
  message?: string;
}

export const TrainerCalendarScreen: React.FC = () => {
  const { colors } = useTheme();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('2024-06-18');
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);

  // Mock data - in real app, this would come from Google Calendar API
  useEffect(() => {
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Strength Training',
        clientName: 'Alex Johnson',
        startTime: '2024-06-18T09:00:00',
        endTime: '2024-06-18T10:00:00',
        status: 'confirmed',
        sessionType: 'Strength Training',
        location: 'Gym A',
      },
      {
        id: '2',
        title: 'Cardio Session',
        clientName: 'Sarah Wilson',
        startTime: '2024-06-18T11:00:00',
        endTime: '2024-06-18T11:30:00',
        status: 'confirmed',
        sessionType: 'Cardio',
        location: 'Gym B',
      },
      {
        id: '3',
        title: 'Yoga Flow',
        clientName: 'Mike Chen',
        startTime: '2024-06-18T14:00:00',
        endTime: '2024-06-18T15:00:00',
        status: 'confirmed',
        sessionType: 'Yoga',
        location: 'Studio 1',
      },
      {
        id: '4',
        title: 'HIIT Training',
        clientName: 'Emma Davis',
        startTime: '2024-06-18T16:00:00',
        endTime: '2024-06-18T16:45:00',
        status: 'pending',
        sessionType: 'HIIT',
        location: 'Gym A',
      },
    ];

    const mockBookingRequests: BookingRequest[] = [
      {
        id: '1',
        clientName: 'John Smith',
        clientEmail: 'john.smith@email.com',
        requestedDate: '2024-06-19',
        requestedTime: '10:00',
        sessionType: 'Strength Training',
        duration: 60,
        message: 'Looking to improve my bench press and overall strength.',
      },
      {
        id: '2',
        clientName: 'Lisa Brown',
        clientEmail: 'lisa.brown@email.com',
        requestedDate: '2024-06-20',
        requestedTime: '15:30',
        sessionType: 'Cardio',
        duration: 45,
        message: 'Want to focus on endurance and weight loss.',
      },
    ];

    setEvents(mockEvents);
    setBookingRequests(mockBookingRequests);
    setLoading(false);
  }, []);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return colors.success;
      case 'pending': return colors.warning;
      case 'cancelled': return colors.destructive;
      default: return colors.mutedForeground;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const handleBookingResponse = (requestId: string, approved: boolean) => {
    Alert.alert(
      approved ? 'Approve Booking' : 'Reject Booking',
      `Are you sure you want to ${approved ? 'approve' : 'reject'} this booking request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: approved ? 'Approve' : 'Reject',
          style: approved ? 'default' : 'destructive',
          onPress: () => {
            // In real app, this would update the backend
            setBookingRequests(prev => prev.filter(req => req.id !== requestId));
            setShowBookingModal(false);
            setSelectedRequest(null);
            Alert.alert(
              'Success',
              `Booking ${approved ? 'approved' : 'rejected'} successfully!`
            );
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.foreground }]}>Loading calendar...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>Trainer Calendar</Text>
      
      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <TouchableOpacity style={styles.dateButton}>
          <Ionicons name="chevron-back" size={20} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.selectedDate, { color: colors.foreground }]}>
          {formatDate(selectedDate)}
        </Text>
        <TouchableOpacity style={styles.dateButton}>
          <Ionicons name="chevron-forward" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      {/* Booking Requests */}
      {bookingRequests.length > 0 && (
        <View style={styles.requestsContainer}>
          <View style={styles.requestsHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Booking Requests</Text>
            <View style={[styles.requestBadge, { backgroundColor: colors.warning + '20' }]}>
              <Text style={[styles.requestCount, { color: colors.warning }]}>
                {bookingRequests.length}
              </Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bookingRequests.map((request) => (
              <TouchableOpacity
                key={request.id}
                style={[styles.requestCard, { backgroundColor: colors.card }]}
                onPress={() => {
                  setSelectedRequest(request);
                  setShowBookingModal(true);
                }}
              >
                <Text style={[styles.requestClientName, { color: colors.foreground }]}>
                  {request.clientName}
                </Text>
                <Text style={[styles.requestDetails, { color: colors.mutedForeground }]}>
                  {request.sessionType} • {request.duration}min
                </Text>
                <Text style={[styles.requestTime, { color: colors.primary }]}>
                  {request.requestedTime} on {formatDate(request.requestedDate)}
                </Text>
                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.success }]}
                    onPress={() => handleBookingResponse(request.id, true)}
                  >
                    <Ionicons name="checkmark" size={16} color={colors.primaryForeground} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.destructive }]}
                    onPress={() => handleBookingResponse(request.id, false)}
                  >
                    <Ionicons name="close" size={16} color={colors.primaryForeground} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Calendar Events */}
      <View style={styles.eventsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Today's Schedule</Text>
        {events.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
            <Ionicons name="calendar-outline" size={48} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              No sessions scheduled for today
            </Text>
          </View>
        ) : (
          events.map((event) => (
            <View key={event.id} style={[styles.eventCard, { backgroundColor: colors.card }]}>
              <View style={styles.eventHeader}>
                <View style={styles.eventTime}>
                  <Text style={[styles.eventStartTime, { color: colors.primary }]}>
                    {formatTime(event.startTime)}
                  </Text>
                  <Text style={[styles.eventEndTime, { color: colors.mutedForeground }]}>
                    - {formatTime(event.endTime)}
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(event.status) + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(event.status) }
                  ]}>
                    {getStatusText(event.status)}
                  </Text>
                </View>
              </View>
              
              <Text style={[styles.eventTitle, { color: colors.foreground }]}>
                {event.title}
              </Text>
              <Text style={[styles.eventClient, { color: colors.mutedForeground }]}>
                {event.clientName}
              </Text>
              
              <View style={styles.eventDetails}>
                <View style={styles.eventDetail}>
                  <Ionicons name="fitness" size={16} color={colors.mutedForeground} />
                  <Text style={[styles.eventDetailText, { color: colors.mutedForeground }]}>
                    {event.sessionType}
                  </Text>
                </View>
                {event.location && (
                  <View style={styles.eventDetail}>
                    <Ionicons name="location" size={16} color={colors.mutedForeground} />
                    <Text style={[styles.eventDetailText, { color: colors.mutedForeground }]}>
                      {event.location}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))
        )}
      </View>

      {/* Booking Request Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            {selectedRequest && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: colors.foreground }]}>
                    Booking Request
                  </Text>
                  <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                    <Ionicons name="close" size={24} color={colors.foreground} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalBody}>
                  <Text style={[styles.modalClientName, { color: colors.foreground }]}>
                    {selectedRequest.clientName}
                  </Text>
                  <Text style={[styles.modalClientEmail, { color: colors.mutedForeground }]}>
                    {selectedRequest.clientEmail}
                  </Text>
                  
                  <View style={styles.modalDetails}>
                    <View style={styles.modalDetail}>
                      <Text style={[styles.modalDetailLabel, { color: colors.mutedForeground }]}>
                        Session Type
                      </Text>
                      <Text style={[styles.modalDetailValue, { color: colors.foreground }]}>
                        {selectedRequest.sessionType}
                      </Text>
                    </View>
                    <View style={styles.modalDetail}>
                      <Text style={[styles.modalDetailLabel, { color: colors.mutedForeground }]}>
                        Duration
                      </Text>
                      <Text style={[styles.modalDetailValue, { color: colors.foreground }]}>
                        {selectedRequest.duration} minutes
                      </Text>
                    </View>
                    <View style={styles.modalDetail}>
                      <Text style={[styles.modalDetailLabel, { color: colors.mutedForeground }]}>
                        Date & Time
                      </Text>
                      <Text style={[styles.modalDetailValue, { color: colors.foreground }]}>
                        {formatDate(selectedRequest.requestedDate)} at {selectedRequest.requestedTime}
                      </Text>
                    </View>
                  </View>
                  
                  {selectedRequest.message && (
                    <View style={styles.modalMessage}>
                      <Text style={[styles.modalMessageLabel, { color: colors.mutedForeground }]}>
                        Message
                      </Text>
                      <Text style={[styles.modalMessageText, { color: colors.foreground }]}>
                        {selectedRequest.message}
                      </Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: colors.destructive }]}
                    onPress={() => handleBookingResponse(selectedRequest.id, false)}
                  >
                    <Text style={[styles.modalButtonText, { color: colors.primaryForeground }]}>
                      Reject
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: colors.success }]}
                    onPress={() => handleBookingResponse(selectedRequest.id, true)}
                  >
                    <Text style={[styles.modalButtonText, { color: colors.primaryForeground }]}>
                      Approve
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
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
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  dateButton: {
    padding: 8,
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: '600',
  },
  requestsContainer: {
    marginBottom: 24,
  },
  requestsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  requestBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  requestCount: {
    fontSize: 12,
    fontWeight: '600',
  },
  requestCard: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  requestClientName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  requestDetails: {
    fontSize: 12,
    marginBottom: 4,
  },
  requestTime: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  eventsContainer: {
    flex: 1,
  },
  emptyState: {
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventStartTime: {
    fontSize: 16,
    fontWeight: '600',
  },
  eventEndTime: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventClient: {
    fontSize: 14,
    marginBottom: 12,
  },
  eventDetails: {
    gap: 8,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventDetailText: {
    fontSize: 12,
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
  modalBody: {
    marginBottom: 20,
  },
  modalClientName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  modalClientEmail: {
    fontSize: 14,
    marginBottom: 20,
  },
  modalDetails: {
    gap: 16,
    marginBottom: 20,
  },
  modalDetail: {
    gap: 4,
  },
  modalDetailLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalDetailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalMessage: {
    gap: 8,
  },
  modalMessageLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  modalMessageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 