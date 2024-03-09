import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async generateToken(request: Request, response: Response) {
    try {
      console.log(request.body);
      const token = await this.authService.generateToken(request.body);

      return response.status(201).json(token);
    } catch (error) {
      return response.status(401).json({ message: error.message });
    }
  }
}
