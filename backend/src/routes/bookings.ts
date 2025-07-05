import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Booking management
router.get('/', (req, res) => {
  res.json({ message: 'Get bookings' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create booking' });
});

router.get('/:bookingId', (req, res) => {
  res.json({ message: 'Get specific booking' });
});

router.put('/:bookingId', (req, res) => {
  res.json({ message: 'Update booking' });
});

router.delete('/:bookingId', (req, res) => {
  res.json({ message: 'Cancel booking' });
});

// Availability
router.get('/availability/:trainerId', (req, res) => {
  res.json({ message: 'Get trainer availability' });
});

export default router; 