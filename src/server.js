import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import "dotenv/config";
import {connectMongoDB}  from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import {errors} from 'celebrate'
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(logger);

app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () =>{
  console.log(`server is on: ${PORT}`)
});
