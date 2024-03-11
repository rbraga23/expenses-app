import { DataSource } from '@database/data-source';
import { UserSeeder } from '@database/seeds/user.seed';
import { User } from '@entities/user.entity';
import { runSeeder } from 'typeorm-extension';

let masterUser: User;
let regularUser: User;

beforeAll(async () => {
  await DataSource.initialize();

  const seeder = await runSeeder(DataSource, UserSeeder);
  const users = seeder.result;

  masterUser = users[0];
  regularUser = users[1];
});

afterAll(async () => {
  await DataSource.destroy();
});

export const sendEmailMock = jest
  .fn()
  .mockReturnValueOnce({ data: { id: 'mock_id' }, error: null });

export { masterUser, regularUser };

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => {
      return {
        emails: {
          send: sendEmailMock,
        },
      };
    }),
  };
});
