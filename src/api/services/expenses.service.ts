import { CreateExpenseDto } from '@dto/create-expense.dto';
import { DataSource } from '@database/data-source';
import { DeleteResult, Repository } from 'typeorm';
import { Expense } from '@entities/expense.entity';
import { User } from '@entities/user.entity';
import { UpdateExpenseDto } from '@dto/update-expense.dto';

export class ExpensesService {
  private expenses: Repository<Expense>;

  constructor() {
    this.expenses = DataSource.getRepository(Expense);
  }

  async findAll(user: User): Promise<Expense[]> {
    return await this.expenses.findBy({ user });
  }

  async findOne(id: number, user: User): Promise<Expense> {
    return await this.expenses.findOneBy({ id, user });
  }

  async create(
    createExpenseDto: CreateExpenseDto,
    user: User,
  ): Promise<Expense> {
    console.log(createExpenseDto, user);
    const expense = this.expenses.create({
      ...createExpenseDto,
      user,
    });

    await this.expenses.save(expense);

    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
    user: User,
  ): Promise<Expense> {
    const expense = await this.expenses.findOneBy({ id, user });

    if (!expense) {
      throw new Error('Expense not found');
    }

    Object.assign(expense, updateExpenseDto);

    await this.expenses.save(expense);

    return expense;
  }

  async delete(id: number, user: User): Promise<DeleteResult> {
    if (!(await this.expenses.findOneBy({ id, user }))) {
      throw new Error('Expense not found');
    }

    return await this.expenses.delete(id);
  }
}
