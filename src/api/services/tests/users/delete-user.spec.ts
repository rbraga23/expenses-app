import { User } from '@entities/user.entity';
import { UsersService } from '@services/users.service';

describe('UsersService - delete user', () => {
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

  it('should delete a user', async () => {
    const createdUser = await service.create(user);
    const deletedUser = await service.delete(createdUser.id);

    expect(deletedUser).toHaveProperty('affected');
  });

  it('should thrown an user not found error', async () => {
    await expect(service.delete(-1)).rejects.toThrow('User not found');
  });
});
