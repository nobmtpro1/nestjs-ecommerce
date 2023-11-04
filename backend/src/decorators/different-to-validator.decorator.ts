import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function DifferentTo(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'DifferentTo',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message: `${propertyName} must be different to ${property.toString()}`,
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object;
          const constraints = args.constraints[0];
          let result = true;
          for (const constraint of constraints) {
            if (object?.[constraint] == value) {
              result = false;
            }
          }
          return result;
        },
      },
    });
  };
}
