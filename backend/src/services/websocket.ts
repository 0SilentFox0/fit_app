import { Server } from 'socket.io';
import { logger } from '../utils/logger';
import { verifyToken } from '../middleware/auth';

export const setupWebSocket = (io: Server): void => {
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const user = await verifyToken(token);
      socket.data.user = user;
      next();
    } catch (error) {
      logger.error('WebSocket authentication error:', error);
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.data.user?.id;
    logger.info(`🔌 WebSocket connected: User ${userId}`);

    // Join user to their personal room
    if (userId) {
      socket.join(`user:${userId}`);
    }

    // Handle chat messages
    socket.on('send_message', async (data) => {
      try {
        const { recipientId, message, type = 'text' } = data;
        
        // Save message to database (implement this)
        // const savedMessage = await saveMessage({
        //   senderId: userId,
        //   recipientId,
        //   content: message,
        //   type,
        // });

        // Emit to recipient
        socket.to(`user:${recipientId}`).emit('receive_message', {
          senderId: userId,
          content: message,
          type,
          timestamp: new Date(),
        });

        // Confirm message sent
        socket.emit('message_sent', {
          messageId: 'temp-id', // Replace with actual message ID
          timestamp: new Date(),
        });

      } catch (error) {
        logger.error('Error sending message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      const { recipientId } = data;
      socket.to(`user:${recipientId}`).emit('user_typing', {
        userId,
        isTyping: true,
      });
    });

    socket.on('typing_stop', (data) => {
      const { recipientId } = data;
      socket.to(`user:${recipientId}`).emit('user_typing', {
        userId,
        isTyping: false,
      });
    });

    // Handle read receipts
    socket.on('mark_read', (data) => {
      const { messageId, senderId } = data;
      socket.to(`user:${senderId}`).emit('message_read', {
        messageId,
        readBy: userId,
        readAt: new Date(),
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`🔌 WebSocket disconnected: User ${userId}`);
    });
  });

  logger.info('✅ WebSocket server initialized');
}; 