import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { createError } from './errorHandler';
import { logger } from '../utils/logger';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    [key: string]: any;
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw createError('Access token required', 401);
    }

    const decoded = jwt.verify(token, config.jwt.secret) as any;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw createError('Invalid token', 401);
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw createError('Token expired', 401);
    }
    next(error);
  }
};

export const verifyToken = async (token: string): Promise<any> => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    logger.error('Token verification failed:', error);
    throw createError('Invalid token', 401);
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw createError('Authentication required', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw createError('Insufficient permissions', 403);
    }

    next();
  };
};

export const requireTrainer = requireRole(['trainer', 'admin']);
export const requireClient = requireRole(['client', 'admin']);
export const requireAdmin = requireRole(['admin']); 