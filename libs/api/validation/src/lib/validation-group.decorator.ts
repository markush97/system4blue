import { PipeTransform, UsePipes, ValidationPipe } from '@nestjs/common';
import { defaultValidationOptions } from './default-validation-options';

/**
 * Decorator that validates a request and binds extra pipes to the scope of the controller or method,
 * depending on its context.
 *
 * When `@ValidationGroup` is used at the controller level, the pipe will be
 * applied to every handler (method) in the controller.
 *
 * When `@UsePipes` is used at the individual handler level, the pipe
 * will apply only to that specific method.
 *
 * @param groups one or more groups to validate against. If no group is specified
 * it acts if all groups were specified.
 *
 * @param pipes a single pipe instance or class, or a list of pipe instances or
 * classes to apply besides ValidationPipe
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 */
export function ValidationGroup(
  groups: string[] | string = [],
  ...pipes: (Function | PipeTransform<any, any>)[]
): ClassDecorator & MethodDecorator {
  if (!Array.isArray(groups)) {
    groups = [groups];
  }

  return UsePipes(
    new ValidationPipe({
      ...defaultValidationOptions,
      groups: groups
    }),
    ...pipes
  );
}
