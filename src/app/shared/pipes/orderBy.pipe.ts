import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false //todo!
})
export class OrderByPipe implements PipeTransform {

  transform<T>(array: T[], field: string, order: 'asc' | 'desc' = 'asc'): T[] {
    const props = field.split(',');
    return [...(array || [])].sort((a, b) =>
      this.sortFn(a, b, props as (keyof T)[], order === 'asc')
    ) as T[];
  }

  private sortFn<T>(a: T, b: T, props: (keyof T)[], asc: boolean) {
    if (!props.length) {
      return 0;
    }
    for (const prop of props) {
      const valA = this.normalize(a[prop]);
      const valB = this.normalize(b[prop]);
      if (valA < valB) {
        return asc ? -1 : 1;
      }
      if (valA > valB) {
        return asc ? 1 : -1;
      }
    }
    return 0;
  }

  private normalize<T>(value: T) {
    if(typeof value === 'string'){
      return value.toLowerCase();
    }
    return value;
  }
}
