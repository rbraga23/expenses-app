import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import http from 'http';
import cors from 'cors';
import { routes } from 'routes';

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(express.json());

app.use(routes);

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
