import { Request, Response } from 'express';
import { ExpensesService } from '@services/expenses.service';

export class ExpensesController {
  private expensesService: ExpensesService;

  constructor() {
    this.expensesService = new ExpensesService();
  }

  async findAll(request: Request, response: Response) {
    try {
      const expenses = await this.expensesService.findAll(request.body.user);

      return response.json(expenses);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async findOne(request: Request, response: Response) {
    try {
      const expense = await this.expensesService.findOne(
        +request.params.id,
        request.body.user,
      );

      return response.json(expense);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const expense = await this.expensesService.create(
        request.body,
        request.body.user,
      );

      return response.status(201).json(expense);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const expense = await this.expensesService.update(
        +request.params.id,
        request.body,
        request.body.user,
      );

      return response.json(expense);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      await this.expensesService.delete(+request.params.id, request.body.user);

      return response.json({ message: 'Expense deleted' });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
