import { Expense } from '@entities/expense.entity';
import { User } from '@entities/user.entity';
import { ExpensesService } from '@services/expenses.service';

jest.mock('resend');

const expenseMock = {
  id: 2,
  description: 'teste',
  value: 10,
  date: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
} as Expense;

const userMock = { id: 1 } as User;

describe('ExpensesService - get expenses', () => {
  let service: ExpensesService;

  beforeEach(async () => {
    service = new ExpensesService();
  });

  it('should get all expenses', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockReturnValue(Promise.resolve([expenseMock]));

    const expenses = await service.findAll(userMock);

    expect(expenses).toBeInstanceOf(Array);
  });

  it('should get expense by id', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockReturnValue(Promise.resolve(expenseMock));

    const user = await service.findOne(1, userMock);

    expect(user).toHaveProperty('id');
  });
});
