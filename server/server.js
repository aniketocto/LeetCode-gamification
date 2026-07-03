import express from 'express';
import mongoose from 'mongoose';
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
const PORT = process.env.PORT || 5000;

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

// Database connection & Startup
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('CRITICAL: MONGO_URI environment variable is missing.');
  process.exit(1);
}

console.log('Connecting to database...');
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB Database.');
    app.listen(PORT, () => {
      console.log(`LeetCode RPG Server running on port: ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch(err => {
    console.error('CRITICAL: Database connection failed:', err.message);
    process.exit(1);
  });
