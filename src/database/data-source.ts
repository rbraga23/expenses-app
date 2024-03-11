import * as dotenv from 'dotenv';
import { DataSourceOptions, DataSource as TypeOrmDataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const env = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: `${__dirname}/../../${env}` });

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: dbPort,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dropSchema: process.env.NODE_ENV === 'test',
  synchronize: process.env.NODE_ENV === 'test',
  entities: [`${__dirname}/../api/entities/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  seeds: [`${__dirname}/seeds/*{.ts,.js}`],
  logging: false,
};

export const DataSource = new TypeOrmDataSource(options);
