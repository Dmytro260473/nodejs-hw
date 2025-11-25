import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';

import notesRoutes from './routes/notesRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

// ===== Middleware =====
app.use(cors({
  origin: true,
  credentials: true, // чтобы куки работали
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===== Routes =====
app.use(userRoutes);
app.use(notesRoutes);

// ===== Handle non-existent routes =====
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// ===== Celebrate validation errors =====
app.use(celebrateErrors());

// ===== Global error handler =====
app.use(errorHandler);

// ===== Connect to MongoDB & Start Server =====
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
