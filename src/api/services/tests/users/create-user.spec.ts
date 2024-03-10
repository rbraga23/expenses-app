import { CreateUserDto } from '@dto/create-user.dto';
import { UsersService } from '@services/users.service';

describe('UsersService - create user', () => {
  let service: UsersService;
  let user: CreateUserDto;

  const name = (Math.random() + 1).toString(36).substring(7);
  const email = `${name}@teste.com`;

  beforeEach(async () => {
    service = new UsersService();
    user = {
      name,
      email,
      role: 0,
    };
  });

  it('should create an user', async () => {
    const createdUser = await service.create(user);

    expect(createdUser).toHaveProperty('id');
  });

  it('should thrown an user already exists error', async () => {
    await expect(service.create(user)).rejects.toThrow('User already exists');
  });
});
