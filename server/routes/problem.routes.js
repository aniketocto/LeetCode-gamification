import { Router } from 'express';
import { getProblems, getProblemBySlug } from '../controllers/problem.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, getProblems);
router.get('/:slug', authenticateToken, getProblemBySlug);

export default router;
