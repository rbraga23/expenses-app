import { AuthController } from 'api/controllers/auth.controller';
import { CreateUserTokenDto } from 'api/dto/create-user-token.dto';
import { ValidatorMiddleware } from 'api/middlewares/validator.middleware';
import { Router } from 'express';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
  '/auth/refresh',
  ValidatorMiddleware.validate<CreateUserTokenDto>(CreateUserTokenDto),
  authController.generateToken.bind(authController),
);

export { authRoutes };
