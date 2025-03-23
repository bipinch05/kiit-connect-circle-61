
import mongoose from 'mongoose';

// Use the provided MongoDB connection string
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb+srv://connectkiit:Hijecked98@cluster0.ntag4.mongodb.net/kiitconnect';

let cached = global as any;
if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  if (!cached.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongoose.set('strictQuery', false);
    cached.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to MongoDB');
      return mongoose;
    });
  }

  try {
    cached.mongoose.conn = await cached.mongoose.promise;
  } catch (e) {
    cached.mongoose.promise = null;
    console.error('Error connecting to MongoDB:', e);
    throw e;
  }

  return cached.mongoose.conn;
}
