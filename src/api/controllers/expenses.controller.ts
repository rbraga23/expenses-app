import { Request, Response } from 'express';
import { ExpensesService } from '@services/expenses.service';

export class ExpensesController {
  private expensesService: ExpensesService;

  constructor() {
    this.expensesService = new ExpensesService();
  }

  async findAll(request: Request, response: Response) {
    try {
      const expenses = await this.expensesService.findAll();

      return response.json(expenses);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async findOne(request: Request, response: Response) {
    try {
      const user = await this.expensesService.findOne(+request.params.id);

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const user = await this.expensesService.create(request.body);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const user = await this.expensesService.update(request.body);

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      await this.expensesService.delete(+request.params.id);

      return response.json({ message: 'User deleted' });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
