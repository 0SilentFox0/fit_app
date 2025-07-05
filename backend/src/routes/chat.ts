import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Chat management
router.get('/conversations', (req, res) => {
  res.json({ message: 'Get conversations' });
});

router.get('/conversations/:conversationId', (req, res) => {
  res.json({ message: 'Get specific conversation' });
});

router.get('/conversations/:conversationId/messages', (req, res) => {
  res.json({ message: 'Get conversation messages' });
});

router.post('/conversations/:conversationId/messages', (req, res) => {
  res.json({ message: 'Send message' });
});

router.put('/messages/:messageId/read', (req, res) => {
  res.json({ message: 'Mark message as read' });
});

export default router; 