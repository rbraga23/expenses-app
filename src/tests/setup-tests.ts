import { DataSource } from '@database/data-source';

beforeAll(async () => {
  await DataSource.initialize();
});

afterAll(async () => {
  await DataSource.destroy();
});
