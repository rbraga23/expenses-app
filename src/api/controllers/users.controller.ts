import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async findAll(request: Request, response: Response) {
    try {
      const users = await this.usersService.findAll();

      return response.json(users);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async findOne(request: Request, response: Response) {
    try {
      const user = await this.usersService.findOne(+request.params.id);

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const user = await this.usersService.create(request.body);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const user = await this.usersService.update(request.body);

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      await this.usersService.delete(+request.params.id);

      return response.json({ message: 'User deleted' });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
