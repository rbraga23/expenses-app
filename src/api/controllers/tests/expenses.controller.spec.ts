import { app } from '@app';
import { Expense } from '@entities/expense.entity';
import { regularUser } from '@tests/setup-tests';
import request from 'supertest';
import dayjs from 'dayjs';

describe('ExpensesController', () => {
  let expense: Expense;

  it('should be able to create a new expense', async () => {
    const response = await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${regularUser.userTokens[0].token}`)
      .send({
        description: 'teste',
        value: 20,
        date: dayjs().add(-1, 'day').format('YYYY-MM-DD'),
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    expense = response.body;
  });

  it('should be able to list all expenses', async () => {
    const response = await request(app)
      .get('/expenses')
      .set('Authorization', `Bearer ${regularUser.userTokens[0].token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expense.id,
        }),
      ]),
    );
  });

  it('should be able to show an expense', async () => {
    const response = await request(app)
      .get(`/expenses/${expense.id}`)
      .set('Authorization', `Bearer ${regularUser.userTokens[0].token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', expense.id);
  });

  it('should be able to update an expense', async () => {
    const response = await request(app)
      .put(`/expenses/${expense.id}`)
      .set('Authorization', `Bearer ${regularUser.userTokens[0].token}`)
      .send({
        description: 'updated',
      });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ description: 'updated' });
  });

  it('should be able to delete an expense', async () => {
    const response = await request(app)
      .delete(`/expenses/${expense.id}`)
      .set('Authorization', `Bearer ${regularUser.userTokens[0].token}`);

    expect(response.status).toBe(200);
  });
});
