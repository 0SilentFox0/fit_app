import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { useTheme } from '../ThemeProvider';

interface TrainersScreenProps {
  navigation: any;
}

export const TrainersScreen: React.FC<TrainersScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [trainers] = useState([
    {
      id: '1',
      name: 'John Smith',
      specialty: 'Strength Training',
      rating: 4.8,
      reviews: 120,
      experience: '5 years',
      price: '$60/hour',
      available: true,
      image: '💪'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      specialty: 'Yoga & Pilates',
      rating: 4.9,
      reviews: 95,
      experience: '8 years',
      price: '$50/hour',
      available: true,
      image: '🧘‍♀️'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      specialty: 'Cardio & HIIT',
      rating: 4.7,
      reviews: 78,
      experience: '3 years',
      price: '$45/hour',
      available: false,
      image: '🏃‍♂️'
    },
    {
      id: '4',
      name: 'Alex Brown',
      specialty: 'CrossFit',
      rating: 4.6,
      reviews: 65,
      experience: '6 years',
      price: '$55/hour',
      available: true,
      image: '🏋️‍♂️'
    }
  ]);

  const handleBookTrainer = (trainerId: string) => {
    Alert.alert('Book Trainer', 'This feature will be available soon!');
  };

  const handleViewProfile = (trainerId: string) => {
    Alert.alert('View Profile', 'This feature will be available soon!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.lg, backgroundColor: theme.colors.background, borderBottomWidth: 1, borderBottomColor: theme.colors.border }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 16, color: theme.colors.primary }}>{'← Back'}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '600', color: theme.colors.text }}>Trainers</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: theme.spacing.lg }}>
        {/* Search Section */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.primary, marginBottom: theme.spacing.xs }}>
            Find Your Perfect Trainer
          </Text>
          <Text style={{ fontSize: 16, color: theme.colors.textSecondary }}>
            Browse certified trainers in your area
          </Text>
        </View>

        {/* Filters Section */}
        <View style={{ flexDirection: 'row', marginBottom: theme.spacing.lg }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{ backgroundColor: theme.colors.primary, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.sm, borderRadius: 20, marginRight: 12 }}>
              <Text style={{ fontSize: 14, color: theme.colors.background }}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: theme.colors.card, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.sm, borderRadius: 20, marginRight: 12, borderWidth: 1, borderColor: theme.colors.border }}>
              <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>Strength</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: theme.colors.card, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.sm, borderRadius: 20, marginRight: 12, borderWidth: 1, borderColor: theme.colors.border }}>
              <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>Cardio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: theme.colors.card, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.sm, borderRadius: 20, marginRight: 12, borderWidth: 1, borderColor: theme.colors.border }}>
              <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>Yoga</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: theme.colors.card, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.sm, borderRadius: 20, marginRight: 12, borderWidth: 1, borderColor: theme.colors.border }}>
              <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>CrossFit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Trainers Section */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.secondary, marginBottom: theme.spacing.md }}>
            Available Trainers
          </Text>
          {trainers.map((trainer) => (
            <View key={trainer.id} style={{ backgroundColor: theme.colors.card, borderRadius: theme.borderRadius, padding: theme.spacing.lg, marginBottom: theme.spacing.md, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Text style={{ fontSize: 40, marginRight: 12 }}>{trainer.image}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text, marginBottom: 4 }}>{trainer.name}</Text>
                    <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginBottom: 4 }}>{trainer.specialty}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: theme.colors.warning, marginRight: 4 }}>⭐ {trainer.rating}</Text>
                      <Text style={{ fontSize: 12, color: theme.colors.textSecondary }}>({trainer.reviews} reviews)</Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: trainer.available ? theme.colors.success : theme.colors.error }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: theme.colors.background }}>
                      {trainer.available ? 'Available' : 'Busy'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginBottom: theme.spacing.sm }}>
                <Text style={{ fontSize: 14, color: theme.colors.textSecondary, marginRight: 16 }}>📅 {trainer.experience} experience</Text>
                <Text style={{ fontSize: 14, color: theme.colors.textSecondary }}>💰 {trainer.price}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                  title="View Profile"
                  onPress={() => handleViewProfile(trainer.id)}
                  variant="outline"
                  size="small"
                  style={{ flex: 1, marginRight: 8 }}
                />
                <Button
                  title="Book Session"
                  onPress={() => handleBookTrainer(trainer.id)}
                  size="small"
                  style={{ flex: 1, marginLeft: 8 }}
                  disabled={!trainer.available}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Featured Section */}
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.accent, marginBottom: theme.spacing.md }}>
            Featured Trainers
          </Text>
          <View style={{ backgroundColor: theme.colors.card, borderRadius: theme.borderRadius, padding: theme.spacing.xl, shadowColor: theme.colors.primary, shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.primary, marginBottom: 8 }}>🏆 Top Rated This Month</Text>
            <Text style={{ fontSize: 16, color: theme.colors.textSecondary, marginBottom: 12 }}>Sarah Johnson - Yoga & Pilates</Text>
            <Text style={{ fontSize: 14, color: theme.colors.textSecondary, lineHeight: 20, marginBottom: 16, fontStyle: 'italic' }}>
              "Sarah has helped me achieve incredible flexibility and mindfulness. Her sessions are both challenging and relaxing."
            </Text>
            <Button
              title="Learn More"
              onPress={() => handleViewProfile('2')}
              variant="outline"
              style={{ alignSelf: 'flex-start' }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}; 