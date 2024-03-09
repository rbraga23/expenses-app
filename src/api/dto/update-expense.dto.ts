import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateExpenseDto } from './create-expense.dto';

export type UpdateExpenseColumns = Partial<CreateExpenseDto>;

export class UpdateExpenseDto implements UpdateExpenseColumns {
  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  value: number;

  @IsDateString()
  @IsOptional()
  date: Date;

  constructor(updateExpenseDto: UpdateExpenseColumns) {
    this.description = updateExpenseDto.description;
    this.value = updateExpenseDto.value;
    this.date = updateExpenseDto.date;
  }
}
