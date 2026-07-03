import { Router } from 'express';
import { getProgression, resetProgression, getSolvedQuests } from '../controllers/progression.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, getProgression);
router.get('/solved', authenticateToken, getSolvedQuests);
router.post('/reset', authenticateToken, resetProgression);

export default router;
