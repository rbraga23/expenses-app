import { IsEmail, IsString } from 'class-validator';
import { User } from 'entities/user.entity';

export type CreateUserColumns = Pick<User, 'name' | 'email'>;

export class CreateUserDto implements CreateUserColumns {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  constructor(createUserDto: CreateUserColumns) {
    this.name = createUserDto.name;
    this.email = createUserDto.email;
  }
}
