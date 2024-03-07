import 'dotenv/config';
import { User } from 'entities/user.entity';
import { DataSource as TypeOrmDataSource } from 'typeorm';

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

export const DataSource = new TypeOrmDataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: dbPort,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../../**/*.entity.ts`],
  migrations: ['src/database/migrations/*.ts'],
  logging: false,
});
