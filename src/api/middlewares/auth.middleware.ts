import { DataSource } from 'database/data-source';
import { UserToken } from 'entities/user-token.entity';
import { NextFunction, Request, Response } from 'express';
import { IsNull, MoreThanOrEqual, Or } from 'typeorm';
import dayjs from 'dayjs';

export class AuthMiddleware {
  static async authenticate(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const headerToken = request.headers.authorization;
      const repository = DataSource.getRepository(UserToken);

      const token = await repository.findOneOrFail({
        where: {
          token: headerToken.replace('Bearer ', ''),
          expires_at: Or(IsNull(), MoreThanOrEqual(dayjs().toDate())),
        },
        relations: ['user'],
      });

      request.body.user = token.user;
    } catch (error) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    return next();
  }
}
