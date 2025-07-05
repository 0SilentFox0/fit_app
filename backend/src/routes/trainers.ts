import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Temporarily disable auth for testing
// router.use(authenticateToken);

// Trainer profile
router.get('/profile', (req, res) => {
  res.json({ message: 'Get trainer profile' });
});

router.put('/profile', (req, res) => {
  res.json({ message: 'Update trainer profile' });
});

// Trainer dashboard - clients list
router.get('/clients', (req, res) => {
  const mockClients = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      avatar: 'AJ',
      lastSession: '2024-06-15',
      totalSessions: 12,
      progress: { strength: 85, cardio: 70, flexibility: 90, balance: 75 },
      paymentStatus: 'paid',
      nextSession: '2024-06-18',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      avatar: 'SW',
      lastSession: '2024-06-14',
      totalSessions: 8,
      progress: { strength: 65, cardio: 85, flexibility: 75, balance: 80 },
      paymentStatus: 'to_pay',
      nextSession: '2024-06-17',
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      avatar: 'MC',
      lastSession: '2024-06-12',
      totalSessions: 20,
      progress: { strength: 90, cardio: 75, flexibility: 80, balance: 85 },
      paymentStatus: 'subscription',
      subscriptionRemaining: 3,
      nextSession: '2024-06-19',
    },
  ];

  res.json({
    success: true,
    message: 'Clients retrieved successfully',
    data: mockClients
  });
});

// Trainer calendar - events
router.get('/calendar/events', (req, res) => {
  const mockEvents = [
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
  ];

  res.json({
    success: true,
    message: 'Calendar events retrieved successfully',
    data: mockEvents
  });
});

// Trainer calendar - booking requests
router.get('/calendar/requests', (req, res) => {
  const mockRequests = [
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

  res.json({
    success: true,
    message: 'Booking requests retrieved successfully',
    data: mockRequests
  });
});

// Approve/reject booking request
router.post('/calendar/requests/:requestId/respond', (req, res) => {
  const { requestId } = req.params;
  const { approved } = req.body;

  res.json({
    success: true,
    message: `Booking request ${approved ? 'approved' : 'rejected'} successfully`,
    data: { requestId, approved }
  });
});

// Analytics
router.get('/analytics', (req, res) => {
  res.json({ message: 'Get trainer analytics' });
});

export default router; 