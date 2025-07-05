import mongoose from 'mongoose';
import { config } from '../index';
import { logger } from '../../utils/logger';

export const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongodb.uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    logger.info('✅ MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (error) => {
      logger.error('❌ MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      logger.info('✅ MongoDB reconnected');
    });
    
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

export const disconnectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info('✅ MongoDB disconnected successfully');
  } catch (error) {
    logger.error('❌ MongoDB disconnection failed:', error);
  }
}; 