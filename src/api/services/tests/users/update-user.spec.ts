import { User } from '@entities/user.entity';
import { UsersService } from '@services/users.service';

describe('UsersService - update user', () => {
  let service: UsersService;
  let user: User;

  const name = (Math.random() + 1).toString(36).substring(7);
  const email = `${name}@teste.com`;

  beforeEach(async () => {
    service = new UsersService();
    user = {
      name,
      email,
      role: 0,
    } as User;
  });

  it('should update an user', async () => {
    const createdUser = await service.create(user);
    const updatedUser = await service.update(createdUser.id, {
      name: 'updated',
    });

    expect(updatedUser.name).toBe('updated');
  });

  it('should thrown an user not found error', async () => {
    await expect(service.update(-1, { name: 'updated' })).rejects.toThrow(
      'User not found',
    );
  });
});
