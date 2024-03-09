import { DataSource } from '@database/data-source';
import { UserToken } from '@entities/user-token.entity';
import { NextFunction, Request, Response } from 'express';
import { IsNull, MoreThanOrEqual, Or } from 'typeorm';
import dayjs from 'dayjs';

export class AuthMiddleware {
  private repository = DataSource.getRepository(UserToken);

  async authenticateMaster(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const headerToken = request.headers.authorization;
      const token = await this.getToken(headerToken, 0);

      request.body.user = token.user;
    } catch (error) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    return next();
  }

  async authenticateUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const headerToken = request.headers.authorization;
      const token = await this.getToken(headerToken, 1);

      request.body.user = token.user;
    } catch (error) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    return next();
  }

  async getToken(token: string, role: number): Promise<UserToken> {
    return await this.repository.findOneOrFail({
      where: {
        token: token.replace('Bearer ', ''),
        expires_at: Or(IsNull(), MoreThanOrEqual(dayjs().toDate())),
        user: {
          role,
        },
      },
      relations: ['user'],
    });
  }
}
