import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Temporarily disable auth for testing
// router.use(authenticateToken);

// Analytics endpoints
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Get dashboard analytics' });
});

router.get('/progress', (req, res) => {
  // Mock progress data - in a real app, this would come from database
  const progressData = {
    success: true,
    message: 'Progress data retrieved successfully',
    data: {
      userStats: [85, 70, 90, 75, 80, 85],
      averageStats: [65, 60, 75, 65, 70, 70],
      labels: ['Strength', 'Cardio', 'Flexibility', 'Balance', 'Endurance', 'Speed'],
      userPercentile: 72,
      trending: 8.5,
      timeRange: 'January - June 2024'
    }
  };
  
  res.json(progressData);
});

router.get('/revenue', (req, res) => {
  res.json({ message: 'Get revenue analytics' });
});

router.get('/performance', (req, res) => {
  res.json({ message: 'Get performance metrics' });
});

export default router; 