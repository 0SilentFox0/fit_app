import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

// Import configurations
import { config } from './config';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

// Import database connections
import { connectPostgreSQL } from './config/database/postgres';
import { connectMongoDB } from './config/database/mongodb';
import { connectRedis } from './config/database/redis';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import trainerRoutes from './routes/trainers';
import clientRoutes from './routes/clients';
import workoutRoutes from './routes/workouts';
import bookingRoutes from './routes/bookings';
import paymentRoutes from './routes/payments';
import chatRoutes from './routes/chat';
import analyticsRoutes from './routes/analytics';
import adminRoutes from './routes/admin';

// Import WebSocket handlers
import { setupWebSocket } from './services/websocket';

// Import GraphQL setup
import { setupGraphQL } from './config/graphql';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: config.frontendUrl,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
    version: process.env.npm_package_version || '1.0.0',
  });
});

// API routes
app.use(`/api/${config.apiVersion}/auth`, authRoutes);
app.use(`/api/${config.apiVersion}/users`, userRoutes);
app.use(`/api/${config.apiVersion}/trainers`, trainerRoutes);
app.use(`/api/${config.apiVersion}/clients`, clientRoutes);
app.use(`/api/${config.apiVersion}/workouts`, workoutRoutes);
app.use(`/api/${config.apiVersion}/bookings`, bookingRoutes);
app.use(`/api/${config.apiVersion}/payments`, paymentRoutes);
app.use(`/api/${config.apiVersion}/chat`, chatRoutes);
app.use(`/api/${config.apiVersion}/analytics`, analyticsRoutes);
app.use(`/api/${config.apiVersion}/admin`, adminRoutes);

// Setup GraphQL if enabled
if (config.features.graphql) {
  setupGraphQL(app);
}

// Setup WebSocket if enabled
if (config.features.websockets) {
  setupWebSocket(io);
}

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to databases
    await connectPostgreSQL();
    await connectMongoDB();
    await connectRedis();

    // Start HTTP server
    server.listen(config.port, () => {
      logger.info(`🚀 FitConnect API server running on port ${config.port}`);
      logger.info(`📊 Environment: ${config.nodeEnv}`);
      logger.info(`🔗 API URL: http://localhost:${config.port}/api/${config.apiVersion}`);
      if (config.features.graphql) {
        logger.info(`🔗 GraphQL URL: http://localhost:${config.port}/graphql`);
      }
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app; 