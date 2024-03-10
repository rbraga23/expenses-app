import { app } from '@app';
import request from 'supertest';

describe('AuthController', () => {
  it('should be able to create a new master token', async () => {
    const response = await request(app).post('/auth/refresh').send({
      email: 'root@root.com',
      refresh_token: '76a52f01-dea7-41da-aedf-5d49195786e4',
    });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to create a new user token', async () => {
    const response = await request(app).post('/auth/refresh').send({
      email: 'user@user.com',
      refresh_token: '8cb451da-6823-4a33-9591-62e506f84e47',
    });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('token');
  });
});
