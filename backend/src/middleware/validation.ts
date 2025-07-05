import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { createError } from './errorHandler';

export const validateRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    throw createError(`Validation failed: ${errorMessages.join(', ')}`, 400);
  }
  
  next();
}; 