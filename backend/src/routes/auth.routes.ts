import { Router, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
const { body, validationResult } = require('express-validator');

const router = Router();
const authService = new AuthService();

// Validation middleware
const registerValidation = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').trim().isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('usernameOrEmail').trim().notEmpty().withMessage('Username or email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Register endpoint
router.post('/register', registerValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const result = await authService.register(username, email, password);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Login endpoint
router.post('/login', loginValidation, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { usernameOrEmail, password } = req.body;
    const result = await authService.login(usernameOrEmail, password);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router; 