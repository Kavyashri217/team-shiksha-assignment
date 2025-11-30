import express from 'express';
import { body } from 'express-validator';
import { signUp, signIn } from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  ],
  signUp
);

router.post(
  '/signin',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  signIn
);

export default router;