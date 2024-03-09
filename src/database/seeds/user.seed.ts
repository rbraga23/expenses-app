import { randomUUID } from 'crypto';
import { User } from 'entities/user.entity';

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class UserSeeder implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const refresh_token = randomUUID();

    const userData = {
      name: 'root',
      email: 'root@root.com',
      type: 0,
      refresh_token,
    };

    const user = userRepository.create(userData);

    try {
      await userRepository.save(user);

      console.info('name:', user.name);
      console.info('email:', user.email);
      console.info('refresh token:', refresh_token);
    } catch (error) {
      console.error(error.message);
    }

    process.exit(0);
  }
}
