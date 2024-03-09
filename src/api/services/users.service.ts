import { User } from '@entities/user.entity';
import { CreateUserDto } from '@dto/create-user.dto';
import { DataSource } from '@database/data-source';
import { DeleteResult, Repository } from 'typeorm';

export class UsersService {
  private users: Repository<User>;

  constructor() {
    this.users = DataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return await this.users.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.users.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.users.create(createUserDto);

    if (await this.users.findOneBy({ email: user.email })) {
      throw new Error('User already exists');
    }

    await this.users.save(user);

    return user;
  }

  async update(createUserDto: CreateUserDto): Promise<User> {
    const user = this.users.create(createUserDto);

    if (await this.users.findOneBy({ email: user.email })) {
      throw new Error('User already exists');
    }

    await this.users.save(user);

    return user;
  }

  async delete(id: number): Promise<DeleteResult> {
    if (!(await this.users.findOneBy({ id }))) {
      throw new Error('User already exists');
    }

    return await this.users.delete(id);
  }
}
