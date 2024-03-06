import 'dotenv/config';
import { DataSource } from 'typeorm';

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

export const myDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: dbPort,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  logging: true,
  synchronize: true,
});
