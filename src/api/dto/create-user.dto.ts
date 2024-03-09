import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { User } from '@entities/user.entity';

export type CreateUserColumns = Pick<User, 'name' | 'email' | 'role'>;

export enum UserRoles {
  ADMIN,
  USER,
}

export class CreateUserDto implements CreateUserColumns {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRoles, { each: true })
  @IsOptional()
  role: UserRoles;

  constructor(createUserDto: CreateUserColumns) {
    this.name = createUserDto.name;
    this.email = createUserDto.email;
    this.role = createUserDto.role;
  }
}
