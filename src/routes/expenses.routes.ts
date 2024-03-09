import { ValidatorMiddleware } from 'api/middlewares/validator.middleware';
import { UsersController } from 'api/controllers/users.controller';
import { CreateUserDto } from 'api/dto/create-user.dto';
import { UpdateUserDto } from 'api/dto/update-user.dto';
import { Router } from 'express';
import { AuthMiddleware } from 'api/middlewares/auth.middleware';

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
