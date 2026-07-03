import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to DB immediately at startup for local development / warm start pre-warming
connectDB().catch(err => {
  if (!process.env.VERCEL) {
    console.error('CRITICAL: Startup DB connection failed:', err.message);
    process.exit(1);
  }
});

// Traditional server start (only if running locally or outside Vercel serverless environment)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`LeetCode RPG Server running on port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export default app for Vercel serverless integration
export default app;
