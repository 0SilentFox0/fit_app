import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Analytics endpoints
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Get dashboard analytics' });
});

router.get('/progress', (req, res) => {
  res.json({ message: 'Get progress analytics' });
});

router.get('/revenue', (req, res) => {
  res.json({ message: 'Get revenue analytics' });
});

router.get('/performance', (req, res) => {
  res.json({ message: 'Get performance metrics' });
});

export default router; 