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

// --- Middleware ---
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_DOMAIN, credentials: true })); // Додані credentials для cookie
app.use(helmet());
app.use(cookieParser());
app.use(logger);

// --- Routes ---
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/users', userRoutes);

// --- Error handlers ---
app.use(notFoundHandler);
app.use(errors()); // Celebrate errors
app.use(errorHandler);

// --- Connect DB & start server ---
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
