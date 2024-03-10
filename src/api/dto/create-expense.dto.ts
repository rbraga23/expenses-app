import {
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { Expense } from '@entities/expense.entity';
import { IsNotFutureDate } from '@utils/validators/is-not-future.validator';

export type CreateExpenseColumns = Pick<
  Expense,
  'description' | 'value' | 'date'
>;

export class CreateExpenseDto implements CreateExpenseColumns {
  @IsString()
  @MaxLength(191)
  description: string;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsDateString()
  @IsNotFutureDate()
  date: Date;

  constructor(createExpenseDto: CreateExpenseColumns) {
    this.description = createExpenseDto.description;
    this.value = createExpenseDto.value;
    this.date = createExpenseDto.date;
  }
}
