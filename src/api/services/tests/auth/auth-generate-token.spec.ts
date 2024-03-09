import { AuthService } from '@services/auth.service';
import { CreateUserTokenDto } from '@dto/create-user-token.dto';

describe('AuthService', () => {
  let service: AuthService;
  let createUserTokenDto: CreateUserTokenDto;

  beforeEach(async () => {
    service = new AuthService();
    createUserTokenDto = {
      email: process.env.TEST_USER_EMAIL,
      refresh_token: process.env.TEST_USER_REFRESH_TOKEN,
      expires_in: 60 * 60 * 8,
    };
  });

  it('should generate a token', async () => {
    const token = await service.generateToken(createUserTokenDto);

    expect(token).toHaveProperty('token');
  });

  it('should throw an unauthorized error', async () => {
    expect(async () => {
      createUserTokenDto.refresh_token = 'invalid_refresh_token';
      await service.generateToken(createUserTokenDto);
    }).rejects.toThrow();
  });
});
