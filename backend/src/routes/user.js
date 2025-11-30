import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', authenticateToken, getProfile);

router.put(
  '/profile',
  authenticateToken,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  ],
  updateProfile
);

export default router;