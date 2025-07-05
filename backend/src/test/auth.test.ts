import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth';
import { errorHandler } from '../middleware/errorHandler';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use(errorHandler);

describe('Auth Routes', () => {
  describe('POST /auth/signup', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'client'
      };

      const response = await request(app)
        .post('/auth/signup')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User created successfully');
      expect(response.body.data.email).toBe(userData.email);
    });

    it('should return 400 for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'client'
      };

      await request(app)
        .post('/auth/signup')
        .send(userData)
        .expect(400);
    });

    it('should return 400 for short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'client'
      };

      await request(app)
        .post('/auth/signup')
        .send(userData)
        .expect(400);
    });
  });

  describe('POST /auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.refreshToken).toBeDefined();
    });

    it('should return 400 for missing email', async () => {
      const loginData = {
        password: 'password123'
      };

      await request(app)
        .post('/auth/login')
        .send(loginData)
        .expect(400);
    });
  });

  describe('POST /auth/refresh-token', () => {
    it('should refresh token successfully', async () => {
      const tokenData = {
        refreshToken: 'valid-refresh-token'
      };

      const response = await request(app)
        .post('/auth/refresh-token')
        .send(tokenData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Token refreshed successfully');
    });
  });
}); 