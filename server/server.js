import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('CRITICAL: MONGO_URI environment variable is missing.');
  process.exit(1);
}

// Reuse existing connection if active (to prevent connection pool storms in serverless environments)
if (mongoose.connection.readyState === 0) {
  console.log('Connecting to database...');
  mongoose.connect(mongoUri)
    .then(() => {
      console.log('Connected to MongoDB Database.');
    })
    .catch(err => {
      console.error('CRITICAL: Database connection failed:', err.message);
      if (!process.env.VERCEL) {
        process.exit(1);
      }
    });
}

// Traditional server start (only if running locally or outside Vercel serverless environment)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`LeetCode RPG Server running on port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export default app for Vercel serverless integration
export default app;
