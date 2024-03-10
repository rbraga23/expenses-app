import { app } from '@app';
import { User } from '@entities/user.entity';
import request from 'supertest';

const name = (Math.random() + 1).toString(36).substring(7);
const email = `${name}@teste.com`;

describe('UsersController', () => {
  let user: User;

  it('should be able to create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer 1a8c4e43-f8ca-4e45-988c-8294a1984809`)
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
      .set('Authorization', `Bearer 1a8c4e43-f8ca-4e45-988c-8294a1984809`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }),
      ]),
    );
  });

  it('should be able to show a user', async () => {
    const response = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer 1a8c4e43-f8ca-4e45-988c-8294a1984809`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }),
    );
  });

  it('should be able to update a user', async () => {
    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Authorization', `Bearer 1a8c4e43-f8ca-4e45-988c-8294a1984809`)
      .send({
        name: 'updated',
      });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ name: 'updated' });
  });

  it('should be able to delete a user', async () => {
    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer 1a8c4e43-f8ca-4e45-988c-8294a1984809`);

    expect(response.status).toBe(200);
  });
});
