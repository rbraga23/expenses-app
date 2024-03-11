import { CreateExpenseDto } from '@dto/create-expense.dto';
import { DataSource } from '@database/data-source';
import { DeleteResult, Repository } from 'typeorm';
import { Expense } from '@entities/expense.entity';
import { User } from '@entities/user.entity';
import { UpdateExpenseDto } from '@dto/update-expense.dto';
import { EmailService } from './email.service';
import dayjs from 'dayjs';
import { currecyFormater } from '@utils/helpers/currency-formater';

export class ExpensesService {
  private expenses: Repository<Expense>;
  private emailService: EmailService;

  constructor() {
    this.expenses = DataSource.getRepository(Expense);
    this.emailService = new EmailService();
  }

  async findAll(user: User): Promise<Expense[]> {
    return await this.expenses.findBy({ user: { id: user.id } });
  }

  async findOne(id: number, user: User): Promise<Expense> {
    const expense = await this.expenses.findOneBy({
      id,
      user: {
        id: user.id,
      },
    });

    return expense;
  }

  async create(
    createExpenseDto: CreateExpenseDto,
    user: User,
  ): Promise<Expense> {
    const expense = this.expenses.create({
      ...createExpenseDto,
      user,
    });

    await this.expenses.save(expense);

    await this.emailService.send({
      to: user.email,
      subject: 'despesa cadastrada',
      html: `
        <p>Uma nova despesa foi cadastrada com os seguintes detalhes:</p>
        <p>
          <strong>id:</strong> ${expense.id}<br />
          <strong>descrição:</strong> ${expense.description}<br />
          <strong>valor:</strong> ${currecyFormater(expense.value)}<br />
          <strong>data:</strong> ${dayjs(expense.date).format('DD/MM/YYYY')}
        </p>
      `,
    });

    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
    user: User,
  ): Promise<Expense> {
    const expense = await this.expenses.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!expense) {
      throw new Error('Expense not found');
    }

    Object.assign(expense, updateExpenseDto);

    await this.expenses.save(expense);

    return expense;
  }

  async delete(id: number, user: User): Promise<DeleteResult> {
    if (!(await this.expenses.findOneBy({ id, user: { id: user.id } }))) {
      throw new Error('Expense not found');
    }

    return await this.expenses.delete(id);
  }
}
