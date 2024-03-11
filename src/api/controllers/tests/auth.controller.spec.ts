import { app } from '@app';
import { masterUser, regularUser } from '@tests/setup-tests';
import request from 'supertest';

describe('AuthController', () => {
  it('should be able to create a new master token', async () => {
    const response = await request(app).post('/auth/refresh').send({
      email: masterUser.email,
      refresh_token: masterUser.refresh_token,
    });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to create a new user token', async () => {
    const response = await request(app).post('/auth/refresh').send({
      email: regularUser.email,
      refresh_token: regularUser.refresh_token,
    });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('token');
  });
});
