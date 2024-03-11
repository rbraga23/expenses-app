import { Expense } from '@entities/expense.entity';
import { ExpensesService } from '@services/expenses.service';
import { regularUser } from '@tests/setup-tests';

describe('ExpensesService - delete expense', () => {
  let service: ExpensesService;
  let expense: Expense;

  const description = 'test';
  const value = 100;
  const date = new Date();

  beforeEach(async () => {
    service = new ExpensesService();
    expense = {
      description,
      value,
      date,
    } as Expense;
  });

  it('should delete a expense', async () => {
    const createdExpense = await service.create(expense, regularUser);
    const deletedExpense = await service.delete(createdExpense.id, regularUser);

    expect(deletedExpense).toHaveProperty('affected');
  });

  it('should thrown an expense not found error', async () => {
    await expect(service.delete(-1, regularUser)).rejects.toThrow(
      'Expense not found',
    );
  });
});
