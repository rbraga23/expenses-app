import { User } from '@entities/user.entity';
import { UsersService } from '@services/users.service';

const usersMock = {
  refresh_token: 'abcb7918-d86f-4aa5-8169-6edffa5e394b',
  id: 1,
  name: 'root',
  email: 'root@root.com',
  role: 0,
  created_at: new Date(),
  updated_at: new Date(),
} as User;

describe('UsersService - get users', () => {
  let service: UsersService;

  beforeEach(async () => {
    service = new UsersService();
  });

  it('should get all users', async () => {
    const users = await service.findAll();

    expect(users).toBeInstanceOf(Array);
  });

  it('should get user by id', async () => {
    jest.spyOn(service, 'findOne').mockReturnValue(Promise.resolve(usersMock));

    const user = await service.findOne(usersMock.id);

    expect(user).toHaveProperty('id');
  });
});
