import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Expense } from '@entities/expense.entity';

export type CreateExpenseColumns = Pick<
  Expense,
  'description' | 'value' | 'date'
>;

export class CreateExpenseDto implements CreateExpenseColumns {
  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsDateString()
  date: Date;

  constructor(createExpenseDto: CreateExpenseColumns) {
    this.description = createExpenseDto.description;
    this.value = createExpenseDto.value;
    this.date = createExpenseDto.date;
  }
}
