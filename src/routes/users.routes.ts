import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import { UsersController } from '@controllers/users.controller';
import { CreateUserDto } from '@dto/create-user.dto';
import { UpdateUserDto } from '@dto/update-user.dto';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';

const usersRoutes = Router();
const usersController = new UsersController();
const authMiddleware = new AuthMiddleware();

usersRoutes.all(
  '/users*',
  authMiddleware.authenticateMaster.bind(authMiddleware),
);

usersRoutes.get('/users', usersController.findAll.bind(usersController));
usersRoutes.get('/users/:id', usersController.findOne.bind(usersController));

usersRoutes.post(
  '/users',
  ValidatorMiddleware.validate<CreateUserDto>(CreateUserDto),
  usersController.create.bind(usersController),
);

usersRoutes.put(
  '/users/:id',
  ValidatorMiddleware.validate<UpdateUserDto>(UpdateUserDto),
  usersController.update.bind(usersController),
);

usersRoutes.delete('/users/:id', usersController.delete);

export { usersRoutes };
