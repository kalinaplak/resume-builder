import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'applyFn',
})
export class ApplyPipe implements PipeTransform {
  transform<T, R>(value: T, fn: (input: T) => R): R | null {
    return fn ? fn(value) : null;
  }
}