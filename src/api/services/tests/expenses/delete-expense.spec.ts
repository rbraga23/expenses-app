import { Expense } from '@entities/expense.entity';
import { User } from '@entities/user.entity';
import { ExpensesService } from '@services/expenses.service';

jest.mock('resend');

describe('ExpensesService - delete expense', () => {
  let service: ExpensesService;
  let expense: Expense;

  const description = 'test';
  const value = 100;
  const date = new Date();

  const user = {
    id: 1,
  } as User;

  beforeEach(async () => {
    service = new ExpensesService();
    expense = {
      description,
      value,
      date,
    } as Expense;
  });

  it('should delete a expense', async () => {
    const createdExpense = await service.create(expense, user);
    const deletedExpense = await service.delete(createdExpense.id, user);

    expect(deletedExpense).toHaveProperty('affected');
  });

  it('should thrown an expense not found error', async () => {
    await expect(service.delete(-1, user)).rejects.toThrow('Expense not found');
  });
});
