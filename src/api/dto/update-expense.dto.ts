import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateExpenseDto } from './create-expense.dto';
import { IsNotFutureDate } from '@utils/validators/is-not-future.validator';

export type UpdateExpenseColumns = Partial<CreateExpenseDto>;

export class UpdateExpenseDto implements UpdateExpenseColumns {
  @IsString()
  @MaxLength(191)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  value?: number;

  @IsDateString()
  @IsNotFutureDate()
  @IsOptional()
  date?: Date;

  constructor(updateExpenseDto: UpdateExpenseColumns) {
    this.description = updateExpenseDto.description;
    this.value = updateExpenseDto.value;
    this.date = updateExpenseDto.date;
  }
}
