import { Router } from 'express';
import { authenticateToken, requireClient } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);
router.use(requireClient);

// Client profile
router.get('/profile', (req, res) => {
  res.json({ message: 'Get client profile' });
});

router.put('/profile', (req, res) => {
  res.json({ message: 'Update client profile' });
});

// Trainer discovery and matching
router.get('/trainers', (req, res) => {
  res.json({ message: 'Get available trainers' });
});

router.get('/trainers/:trainerId', (req, res) => {
  res.json({ message: 'Get specific trainer' });
});

// Workout tracking
router.get('/workouts', (req, res) => {
  res.json({ message: 'Get client workouts' });
});

router.post('/workouts/:workoutId/complete', (req, res) => {
  res.json({ message: 'Complete workout' });
});

// Progress tracking
router.get('/progress', (req, res) => {
  res.json({ message: 'Get client progress' });
});

router.post('/progress', (req, res) => {
  res.json({ message: 'Update progress' });
});

export default router; 