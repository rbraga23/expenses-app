import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes';
import { DataSource } from 'database/data-source';

DataSource.initialize()
  .then(() => {
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

    const server = http.createServer(app);
    const port = process.env.PORT || 3000;

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
    process.exit(1);
  });
