import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Apply authentication to all routes
router.use(authenticateToken);

// User profile routes
router.get('/profile', (req, res) => {
  res.json({ message: 'Get user profile' });
});

router.put('/profile', (req, res) => {
  res.json({ message: 'Update user profile' });
});

router.delete('/profile', (req, res) => {
  res.json({ message: 'Delete user profile' });
});

// User settings routes
router.get('/settings', (req, res) => {
  res.json({ message: 'Get user settings' });
});

router.put('/settings', (req, res) => {
  res.json({ message: 'Update user settings' });
});

export default router; 