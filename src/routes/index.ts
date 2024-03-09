import { usersRoutes } from '@routes/users.routes';
import { authRoutes } from '@routes/auth.routes';
import { expensesRoutes } from '@routes/expenses.routes';
import { Router } from 'express';

const routes = Router();

routes.use(authRoutes);
routes.use(usersRoutes);
routes.use(expensesRoutes);

export { routes };
