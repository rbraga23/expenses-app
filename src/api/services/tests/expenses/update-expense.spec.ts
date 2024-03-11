import { Expense } from '@entities/expense.entity';
import { ExpensesService } from '@services/expenses.service';
import { regularUser } from '@tests/setup-tests';

describe('ExpensesService - update expense', () => {
  let service: ExpensesService;
  let expense: Expense;

  const description = 'test';
  const value = 100;

  beforeEach(async () => {
    service = new ExpensesService();
    expense = {
      description,
      value,
      date: new Date(),
    } as Expense;
  });

  it('should update an expense', async () => {
    const createdExpense = await service.create(expense, regularUser);
    const updatedExpense = await service.update(
      createdExpense.id,
      {
        description: 'updated',
      },
      regularUser,
    );

    expect(updatedExpense.description).toBe('updated');
  });

  it('should thrown an expense not found error', async () => {
    await expect(
      service.update(-1, { description: 'updated' }, regularUser),
    ).rejects.toThrow();
  });
});
