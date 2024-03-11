import { AuthService } from '@services/auth.service';
import { CreateUserTokenDto } from '@dto/create-user-token.dto';
import { masterUser } from '@tests/setup-tests';

describe('AuthService - generate token', () => {
  let service: AuthService;
  let createUserTokenDto: CreateUserTokenDto;

  beforeEach(async () => {
    service = new AuthService();
    createUserTokenDto = {
      email: masterUser.email,
      refresh_token: masterUser.refresh_token,
      expires_in: 60 * 60 * 8,
    };
  });

  it('should generate a token', async () => {
    const token = await service.generateToken(createUserTokenDto);

    expect(token).toHaveProperty('token');
  });

  it('should throw an unauthorized error', async () => {
    createUserTokenDto.refresh_token = 'invalid_refresh_token';

    await expect(service.generateToken(createUserTokenDto)).rejects.toThrow();
  });
});
