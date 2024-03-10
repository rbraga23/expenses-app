import { CreateExpenseDto } from '@dto/create-expense.dto';
import { User } from '@entities/user.entity';
import { ExpensesService } from '@services/expenses.service';
import { ValidationError, validateOrReject } from 'class-validator';
import dayjs from 'dayjs';

describe('expensesService - create expense', () => {
  let service: ExpensesService;
  let expense: CreateExpenseDto;

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
    };
  });

  it('should create an expense', async () => {
    const createdExpense = await service.create(expense, user);

    expect(createdExpense).toHaveProperty('id');
  });

  it('should thrown an invalid date error', async () => {
    const dto = new CreateExpenseDto(expense);

    dto.date = dayjs().add(1, 'day').toDate();

    try {
      await validateOrReject(dto, {
        whitelist: true,
        validationError: { target: false },
      });
    } catch (error) {
      expect(
        error.find((err: ValidationError) => err.property === 'date'),
      ).toHaveProperty('date');
    }
  });

  it('should thrown an invalid value error', async () => {
    const dto = new CreateExpenseDto(expense);

    dto.value = -1;

    try {
      await validateOrReject(dto, {
        whitelist: true,
        validationError: { target: false },
      });
    } catch (error) {
      expect(
        error.find((err: ValidationError) => err.property === 'value'),
      ).toHaveProperty('value');
    }
  });
});
