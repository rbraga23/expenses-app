import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from '@routes/index';

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());
app.use(routes);

app.disable('x-powered-by');

export { app };
