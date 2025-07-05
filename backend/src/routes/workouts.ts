import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Workout management
router.get('/', (req, res) => {
  res.json({ message: 'Get workouts' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create workout' });
});

router.get('/:workoutId', (req, res) => {
  res.json({ message: 'Get specific workout' });
});

router.put('/:workoutId', (req, res) => {
  res.json({ message: 'Update workout' });
});

router.delete('/:workoutId', (req, res) => {
  res.json({ message: 'Delete workout' });
});

// Exercise library
router.get('/exercises', (req, res) => {
  res.json({ message: 'Get exercise library' });
});

router.get('/exercises/:exerciseId', (req, res) => {
  res.json({ message: 'Get specific exercise' });
});

export default router; 