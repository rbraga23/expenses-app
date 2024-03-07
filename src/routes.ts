import { Router } from 'express';
import { UsersController } from 'api/users/controllers/users.controller';
import { ValidatorMiddleware } from 'api/middlewares/validator.middleware';
import { CreateUserDto } from 'api/users/dto/create-user.dto';
import { AuthMiddleware } from 'api/middlewares/auth.middleware';

const routes = Router();
const usersController = new UsersController();

routes.all('*', AuthMiddleware.authenticate);

routes.post(
  '/users',
  ValidatorMiddleware.validate<CreateUserDto>(CreateUserDto),
  usersController.create.bind(usersController),
);

export { routes };
