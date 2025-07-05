import { createClient } from 'redis';
import { config } from '../index';
import { logger } from '../../utils/logger';

const redisClient = createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  },
  password: config.redis.password,
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    logger.info('✅ Redis connected successfully');
    
    redisClient.on('error', (error) => {
      logger.error('❌ Redis connection error:', error);
    });
    
    redisClient.on('reconnecting', () => {
      logger.info('🔄 Redis reconnecting...');
    });
    
  } catch (error) {
    logger.error('❌ Redis connection failed:', error);
    throw error;
  }
};

export const disconnectRedis = async (): Promise<void> => {
  try {
    await redisClient.disconnect();
    logger.info('✅ Redis disconnected successfully');
  } catch (error) {
    logger.error('❌ Redis disconnection failed:', error);
  }
};

export default redisClient; 