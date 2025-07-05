import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Mock external services
jest.mock('../config/database/postgres', () => ({
  connectPostgreSQL: jest.fn(),
  disconnectPostgreSQL: jest.fn(),
  db: {
    raw: jest.fn(),
  },
}));

jest.mock('../config/database/mongodb', () => ({
  connectMongoDB: jest.fn(),
  disconnectMongoDB: jest.fn(),
}));

jest.mock('../config/database/redis', () => ({
  connectRedis: jest.fn(),
  disconnectRedis: jest.fn(),
  default: {
    connect: jest.fn(),
    disconnect: jest.fn(),
  },
}));

// Global test timeout
jest.setTimeout(10000); 