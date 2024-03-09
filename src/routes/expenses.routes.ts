import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import { UsersController } from '@controllers/users.controller';
import { CreateUserDto } from '@dto/create-user.dto';
import { UpdateUserDto } from '@dto/update-user.dto';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';

const expensesRoutes = Router();
const usersController = new UsersController();
const authMiddleware = new AuthMiddleware();

expensesRoutes.all(
  '/expenses*',
  authMiddleware.authenticateUser.bind(authMiddleware),
);

expensesRoutes.get('/expenses', usersController.create);
expensesRoutes.get('/expenses/:id', usersController.create);

expensesRoutes.post(
  '/expenses',
  ValidatorMiddleware.validate<CreateUserDto>(CreateUserDto),
  usersController.create.bind(usersController),
);

expensesRoutes.put(
  '/expenses/:id',
  ValidatorMiddleware.validate<UpdateUserDto>(UpdateUserDto),
  usersController.update.bind(usersController),
);

expensesRoutes.delete('/expenses/:id', usersController.delete);

export { expensesRoutes };
