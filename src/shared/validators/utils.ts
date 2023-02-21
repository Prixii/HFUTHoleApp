import { isNumber, registerDecorator, ValidationOptions } from 'class-validator'

export function NumberLength(
  max: number,
  min: number,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'NumberLength',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const valueToStr = value?.toString() || ''
          if (
            !isNumber(value) ||
            valueToStr.length < min ||
            valueToStr.length > max
          ) {
            return false
          }

          return true
        },
      },
    })
  }
}
