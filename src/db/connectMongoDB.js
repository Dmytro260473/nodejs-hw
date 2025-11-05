import mongoose from 'mongoose';
import { Note } from '../models/note.js';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error('❌ MONGO_URL is not defined. Please set it in environment variables.');
    }

    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');

    await Note.syncIndexes();
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
