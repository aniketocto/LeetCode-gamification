import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import Route modules
import authRoutes from './routes/auth.routes.js';
import leetcodeRoutes from './routes/leetcode.routes.js';
import problemRoutes from './routes/problem.routes.js';
import progressionRoutes from './routes/progression.routes.js';

dotenv.config();

const app = express();

// Security and request parsing middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/leetcode', leetcodeRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/progression', progressionRoutes);

// Base sanity check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error occurred.'
  });
});

export default app;
