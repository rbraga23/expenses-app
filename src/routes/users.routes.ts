import { ValidatorMiddleware } from 'api/middlewares/validator.middleware';
import { UsersController } from 'api/controllers/users.controller';
import { CreateUserDto } from 'api/dto/create-user.dto';
import { UpdateUserDto } from 'api/dto/update-user.dto';
import { Router } from 'express';
import { AuthMiddleware } from 'api/middlewares/auth.middleware';

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
