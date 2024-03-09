import { CreateUserDto } from '@dto/create-user.dto';
import { DataSource } from '@database/data-source';
import { DeleteResult, Repository } from 'typeorm';
import { Expense } from '@entities/expense.entity';

export class ExpensesService {
  private expenses: Repository<Expense>;

  constructor() {
    this.expenses = DataSource.getRepository(Expense);
  }

  async findAll(): Promise<Expense[]> {
    return await this.expenses.find();
  }

  async findOne(id: number): Promise<Expense> {
    return await this.expenses.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<Expense> {
    const user = this.expenses.create(createUserDto);

    if (await this.expenses.findOneBy({ email: user.email })) {
      throw new Error('User already exists');
    }

    await this.expenses.save(user);

    return user;
  }

  async update(createUserDto: CreateUserDto): Promise<Expense> {
    const user = this.expenses.create(createUserDto);

    if (await this.expenses.findOneBy({ email: user.email })) {
      throw new Error('User already exists');
    }

    await this.expenses.save(user);

    return user;
  }

  async delete(id: number): Promise<DeleteResult> {
    if (!(await this.expenses.findOneBy({ id }))) {
      throw new Error('User already exists');
    }

    return await this.expenses.delete(id);
  }
}
