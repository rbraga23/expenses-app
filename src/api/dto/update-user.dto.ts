import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserColumns } from './create-user.dto';

type UpdateUserColumns = Partial<CreateUserColumns>;

export class UpdateUserDto implements UpdateUserColumns {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  constructor(updateUserDto: UpdateUserDto) {
    this.name = updateUserDto.name;
    this.email = updateUserDto.email;
  }
}
