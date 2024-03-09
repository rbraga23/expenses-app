import { DataSource } from '@database/data-source';
import { Repository } from 'typeorm';
import { User } from '@entities/user.entity';
import { UserToken } from '@entities/user-token.entity';
import { CreateUserTokenDto } from '@dto/create-user-token.dto';
import dayjs from 'dayjs';

interface GenerateTokenResponse {
  token: string;
  expires_at: Date;
}

export class AuthService {
  private users: Repository<User>;
  private userTokens: Repository<UserToken>;

  constructor() {
    this.users = DataSource.getRepository(User);
    this.userTokens = DataSource.getRepository(UserToken);
  }

  async generateToken(
    createUserTokenDto: CreateUserTokenDto,
  ): Promise<GenerateTokenResponse> {
    const user = await this.users.findOne({
      where: {
        email: createUserTokenDto.email,
        refresh_token: createUserTokenDto.refresh_token,
      },
    });

    if (!user) {
      throw new Error('Unauthorized');
    }

    const expires_at = dayjs()
      .add(createUserTokenDto.expires_in || 60 * 60 * 8, 'seconds') // default 8 hours
      .toDate();

    const userToken = this.userTokens.create({
      expires_at,
      user,
    });

    await this.userTokens.save(userToken);

    return {
      token: userToken.token,
      expires_at,
    };
  }
}
