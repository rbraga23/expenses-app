import { CreateExpenseDto } from '@dto/create-expense.dto';
import { ExpensesService } from '@services/expenses.service';
import { regularUser } from '@tests/setup-tests';
import { ValidationError, validateOrReject } from 'class-validator';
import dayjs from 'dayjs';

describe('expensesService - create expense', () => {
  let service: ExpensesService;
  let expense: CreateExpenseDto;

  const description = 'test';
  const value = 100;

  beforeEach(async () => {
    service = new ExpensesService();
    expense = {
      description,
      value,
      date: new Date(),
    };
  });

  it('should create an expense', async () => {
    const createdExpense = await service.create(expense, regularUser);

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
      ).toBeDefined();
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
      ).toBeDefined();
    }
  });
});
