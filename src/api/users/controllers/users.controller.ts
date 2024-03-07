import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { validateOrReject } from 'class-validator';
import { UsersService } from '../services/users.service';

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async create(request: Request, response: Response) {
    try {
      const user = await this.usersService.create(request.body);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
