import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';
import * as authController from '../controllers/auth';

const router = Router();

// Validation rules
const signupValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('role').isIn(['client', 'trainer']),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

const refreshTokenValidation = [
  body('refreshToken').notEmpty(),
];

// Routes
router.post('/signup', signupValidation, validateRequest, authController.signup);
router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/refresh-token', refreshTokenValidation, validateRequest, authController.refreshToken);
router.post('/logout', authenticateToken, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);

// Social login routes
router.post('/google', authController.googleLogin);
router.post('/apple', authController.appleLogin);
router.post('/facebook', authController.facebookLogin);

export default router; 