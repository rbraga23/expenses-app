import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ async: false })
export class IsNotFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: Date) {
    return !dayjs().isBefore(date, 'day') || dayjs().isSame(date, 'day');
  }

  defaultMessage() {
    return 'Date cannot be in the future';
  }
}

export function IsNotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotFutureDateConstraint,
    });
  };
}
