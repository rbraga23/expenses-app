import { DataSource } from '@database/data-source';
import { runSeeder } from 'typeorm-extension';
import { UserSeeder } from '@database/seeds/user.seed';

(async () => {
  await DataSource.initialize();
  await runSeeder(DataSource, UserSeeder);

  process.exit(0);
})();
