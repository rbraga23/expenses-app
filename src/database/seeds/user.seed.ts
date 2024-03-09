import { randomUUID } from 'crypto';
import { User } from 'api/entities/user.entity';

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class UserSeeder implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const masterRefreshToken = randomUUID();
    const regularRefreshToken = randomUUID();

    const masterUserData = {
      name: 'root',
      email: 'root@root.com',
      role: 0,
      refreshToken: masterRefreshToken,
    };

    const regularUserData = {
      name: 'user',
      email: 'user@user.com',
      role: 1,
      refreshToken: regularRefreshToken,
    };

    const masterUser = userRepository.create(masterUserData);
    const regularUser = userRepository.create(regularUserData);

    try {
      await userRepository.save(masterUser);
      await userRepository.save(regularUser);

      console.info('master user:', '\n');
      console.info('name:', masterUser.name);
      console.info('email:', masterUser.email);
      console.info('refresh token:', masterRefreshToken, '\n');

      console.info('regular user:', '\n');
      console.info('name:', regularUser.name);
      console.info('email:', regularUser.email);
      console.info('refresh token:', regularRefreshToken);
    } catch (error) {
      console.error(error.message);
    }

    process.exit(0);
  }
}
