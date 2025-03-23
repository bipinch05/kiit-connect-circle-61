
import mongoose from 'mongoose';

// Use the provided MongoDB connection string
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb+srv://connectkiit:Hijecked98@cluster0.ntag4.mongodb.net/kiitconnect';

// Create cached connection variable
let cached = {
  conn: null as mongoose.Connection | null,
  promise: null as Promise<mongoose.Connection> | null
};

// Polyfill global for client-side
if (typeof window !== 'undefined' && !window.hasOwnProperty('global')) {
  (window as any).global = window;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongoose.set('strictQuery', false);
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Error connecting to MongoDB:', e);
    throw e;
  }

  return cached.conn;
}
