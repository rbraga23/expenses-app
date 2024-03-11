import { app } from '@app';
import { User } from '@entities/user.entity';
import { masterUser } from '@tests/setup-tests';
import request from 'supertest';

const name = (Math.random() + 1).toString(36).substring(7);
const email = `${name}@teste.com`;

describe('UsersController', () => {
  let user: User;

  it('should be able to create an new user', async () => {
    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${masterUser.userTokens[0].token}`)
      .send({
        email: email,
        name: name,
        role: 0,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    user = response.body;
  });

  it('should be able to list all users', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${masterUser.userTokens[0].token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: user.id,
        }),
      ]),
    );
  });

  it('should be able to show an user', async () => {
    const response = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${masterUser.userTokens[0].token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: user.id,
      }),
    );
  });

  it('should be able to update an user', async () => {
    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Authorization', `Bearer ${masterUser.userTokens[0].token}`)
      .send({
        name: 'updated',
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ name: 'updated' });
  });

  it('should be able to delete a user', async () => {
    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${masterUser.userTokens[0].token}`);

    expect(response.status).toBe(200);
  });
});
