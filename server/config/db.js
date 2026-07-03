import mongoose from 'mongoose';

let cachedConnection = null;
let connectionPromise = null;

/**
 * Serverless-safe MongoDB connection manager.
 * Reuses existing connections and caches in-flight promises to prevent connection storms.
 */
export async function connectDB() {
  const readyState = mongoose.connection.readyState;
  console.log(`[DB] readyState=${readyState}`);

  const hasMongoUri = !!process.env.MONGO_URI;
  console.log(`[DB] MONGO_URI present=${hasMongoUri}`);

  // 1. If already connected, reuse the active connection
  if (readyState === 1) {
    return mongoose.connection;
  }

  // 2. If a connection is in-flight, return the existing promise to prevent parallel attempts
  if (connectionPromise) {
    console.log('[DB] reusing connection attempt in-flight promise');
    return connectionPromise;
  }

  if (!hasMongoUri) {
    const err = new Error('MONGO_URI is missing from environment.');
    console.error(`[DB] connection failed name=${err.name}`);
    console.error(`[DB] connection failed message=${err.message}`);
    throw err;
  }

  console.log('[DB] connection attempt started');
  
  // Set up connection options including server selection timeout to prevent hanging requests
  connectionPromise = mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000 // 5 seconds
  });

  try {
    cachedConnection = await connectionPromise;
    console.log('[DB] connection established');
    return cachedConnection;
  } catch (error) {
    console.error(`[DB] connection failed name=${error.name}`);
    console.error(`[DB] connection failed message=${error.message}`);
    cachedConnection = null;
    throw error;
  } finally {
    connectionPromise = null;
  }
}
