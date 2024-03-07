import { User } from 'entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { DataSource } from 'database/data-source';
import { Repository } from 'typeorm';

export class UsersService {
  private users: Repository<User>;

  constructor() {
    this.users = DataSource.getRepository(User);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.users.create(createUserDto);

    if (await this.users.findOneBy({ email: user.email })) {
      throw new Error('User already exists');
    }

    await this.users.save(user);

    return user;
  }
}
