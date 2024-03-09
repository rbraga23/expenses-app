import { ValidatorMiddleware } from '@middlewares/validator.middleware';
import { ExpensesController } from '@controllers/expenses.controller';
import { UpdateUserDto } from '@dto/update-user.dto';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';
import { CreateExpenseDto } from '@dto/create-expense.dto';

const expensesRoutes = Router();
const expensesController = new ExpensesController();
const authMiddleware = new AuthMiddleware();

expensesRoutes.all(
  '/expenses*',
  authMiddleware.authenticateUser.bind(authMiddleware),
);

expensesRoutes.get(
  '/expenses',
  expensesController.findAll.bind(expensesController),
);
expensesRoutes.get(
  '/expenses/:id',
  expensesController.findOne.bind(expensesController),
);

expensesRoutes.post(
  '/expenses',
  ValidatorMiddleware.validate<CreateExpenseDto>(CreateExpenseDto),
  expensesController.create.bind(expensesController),
);

expensesRoutes.put(
  '/expenses/:id',
  ValidatorMiddleware.validate<UpdateUserDto>(UpdateUserDto),
  expensesController.update.bind(expensesController),
);

expensesRoutes.delete(
  '/expenses/:id',
  expensesController.delete.bind(expensesController),
);

export { expensesRoutes };
