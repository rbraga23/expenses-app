import 'dotenv/config';
import { DataSourceOptions, DataSource as TypeOrmDataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: dbPort,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../../**/*.entity.ts`],
  migrations: ['src/database/migrations/*.ts'],
  seeds: ['src/database/seeds/*.ts'],
  logging: false,
};

export const DataSource = new TypeOrmDataSource(options);
