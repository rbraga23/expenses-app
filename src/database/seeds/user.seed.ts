import { randomUUID } from 'crypto';
import { User } from '@entities/user.entity';

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import dayjs from 'dayjs';

export class UserSeeder implements Seeder {
  track = false;

  public async run(dataSource: DataSource): Promise<User[]> {
    const userRepository = dataSource.getRepository(User);
    const masterRefreshToken = randomUUID();
    const regularRefreshToken = randomUUID();

    const masterUserData = {
      id: 1,
      name: 'root',
      email: 'root@root.com',
      role: 0,
      refresh_token: masterRefreshToken,
      userTokens: [
        {
          token: randomUUID(),
          expires_at: dayjs().add(1, 'day').toDate(),
        },
      ],
    };

    const regularUserData = {
      id: 2,
      name: 'user',
      email: 'user@user.com',
      role: 1,
      refreshToken: regularRefreshToken,
      userTokens: [
        {
          token: randomUUID(),
          expires_at: dayjs().add(1, 'day').toDate(),
        },
      ],
    };

    const masterUser = userRepository.create(masterUserData);
    const regularUser = userRepository.create(regularUserData);

    try {
      await userRepository.save(masterUser);
      await userRepository.save(regularUser);

      return [masterUser, regularUser];
    } catch (error) {
      console.error(error.message);
    }

    process.exit(0);
  }
}
