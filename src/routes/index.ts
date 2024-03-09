import { Router } from 'express';
import { usersRoutes } from 'routes/users.routes';
import { authRoutes } from './auth.routes';
import { expensesRoutes } from './expenses.routes';

const routes = Router();

routes.use(authRoutes);
routes.use(usersRoutes);
routes.use(expensesRoutes);

export { routes };
