import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errors } from 'celebrate';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(cors({
  origin: process.env.FRONTEND_DOMAIN,
  credentials: true,
}));
app.use(helmet());

// Routes
app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// Start server
const startServer = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
