import { Expense } from '@entities/expense.entity';
import { User } from '@entities/user.entity';
import { ExpensesService } from '@services/expenses.service';

describe('ExpensesService - update expense', () => {
  let service: ExpensesService;
  let expense: Expense;

  const description = 'test';
  const value = 100;

  const user = {
    id: 1,
  } as User;

  beforeEach(async () => {
    service = new ExpensesService();
    expense = {
      description,
      value,
      date: new Date(),
    } as Expense;
  });

  it('should update an expense', async () => {
    const createdExpense = await service.create(expense, user);
    const updatedExpense = await service.update(
      createdExpense.id,
      {
        description: 'updated',
      },
      user,
    );

    expect(updatedExpense.description).toBe('updated');
  });

  it('should thrown an expense not found error', async () => {
    await expect(
      service.update(-1, { description: 'updated' }, user),
    ).rejects.toThrow('Expense not found');
  });
});
