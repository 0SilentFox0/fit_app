import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Temporarily disable auth for testing
// router.use(authenticateToken);

// Get all workouts
router.get('/', (req, res) => {
  res.json({ message: 'Get all workouts' });
});

// Get specific workout
router.get('/:id', (req, res) => {
  res.json({ message: 'Get specific workout' });
});

// Create workout
router.post('/', (req, res) => {
  res.json({ message: 'Create workout' });
});

// Update workout
router.put('/:id', (req, res) => {
  res.json({ message: 'Update workout' });
});

// Delete workout
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete workout' });
});

// Training history with detailed exercise data
router.get('/history/detailed', (req, res) => {
  const mockTrainingHistory = [
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

  res.json({
    success: true,
    message: 'Training history retrieved successfully',
    data: mockTrainingHistory
  });
});

// Exercise progress tracking
router.get('/progress/:exerciseName', (req, res) => {
  const { exerciseName } = req.params;
  
  // Mock exercise progress data
  const mockProgress = {
    exerciseName,
    history: [
      { date: '2024-06-08', weight: 155, reps: 8, sets: 4 },
      { date: '2024-06-12', weight: 160, reps: 8, sets: 4 },
      { date: '2024-06-15', weight: 165, reps: 8, sets: 4 },
    ],
    personalBest: { weight: 165, reps: 8, date: '2024-06-15' },
    improvement: 6.5, // percentage improvement
  };

  res.json({
    success: true,
    message: 'Exercise progress retrieved successfully',
    data: mockProgress
  });
});

export default router; 