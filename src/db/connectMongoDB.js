import mongoose from 'mongoose';
import { Note } from '../models/note.js';

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_URL is not defined in environment variables');
    }

    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connection established successfully');

    
    await Note.syncIndexes();
    console.log('✅ Note indexes synced successfully');

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); 
  }
};
