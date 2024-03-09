import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { User } from '@entities/user.entity';

export type CreateUserTokenColumns = Pick<User, 'email' | 'refresh_token'> & {
  expires_in: number;
};

export class CreateUserTokenDto implements CreateUserTokenColumns {
  @IsEmail()
  email: string;

  @IsString()
  refresh_token: string;

  @IsInt()
  @IsOptional()
  expires_in: number;

  constructor(createUserTokenDto: CreateUserTokenColumns) {
    this.email = createUserTokenDto.email;
    this.refresh_token = createUserTokenDto.refresh_token;
    this.expires_in = createUserTokenDto.expires_in;
  }
}
