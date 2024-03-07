import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

type Constructor<T> = {
  new (args: any): T;
};

type ValidationError = { [key: string]: string[] };

export class ValidatorMiddleware {
  static validate<T extends {}>(DtoClass: Constructor<T>) {
    return async (request: Request, response: Response, next: NextFunction) => {
      try {
        const dto = new DtoClass(request.body);

        await validateOrReject(dto, {
          whitelist: true,
          validationError: { target: false },
        });
      } catch (error) {
        if (error instanceof Array) {
          const validationErrors = {} as ValidationError;

          error.map((err: any) => {
            const key: string = err.property;
            validationErrors[key] = Object.values(err.constraints);
          });

          return response.status(400).json(validationErrors);
        }
      }

      next();
    };
  }
}
