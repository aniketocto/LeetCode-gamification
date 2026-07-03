import { Router } from 'express';
import { connectProfile, syncProfile } from '../controllers/leetcode.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/connect', authenticateToken, connectProfile);
router.post('/sync', authenticateToken, syncProfile);

export default router;
