import { AuthController } from '@controllers/auth.controller';
import { CreateUserTokenDto } from '@dto/create-user-token.dto';
import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import { Router } from 'express';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
  '/auth/refresh',
  ValidatorMiddleware.validate<CreateUserTokenDto>(CreateUserTokenDto),
  authController.generateToken.bind(authController),
);

export { authRoutes };
