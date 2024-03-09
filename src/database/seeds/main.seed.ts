import { DataSource } from 'database/data-source';
import { runSeeder } from 'typeorm-extension';
import { UserSeeder } from './user.seed';

(async () => {
  await DataSource.initialize();
  await runSeeder(DataSource, UserSeeder);
})();
