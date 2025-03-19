import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] {
    const props = field.split(',');
    return [...(array || [])].sort((a, b) =>
      this.sortFn(a, b, props, order === 'asc')
    ) as any;
  }

  private sortFn(a: any, b: any, props: string[], asc: boolean) {
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

  private normalize(value: string) {
    return value.toString().toLowerCase();
  }
}
