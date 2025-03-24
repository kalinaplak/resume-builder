import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'formatDate',
  standalone: true,
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string | Date | Timestamp, format: string, inputFormat?: string) {
    if (!value) {
      return value;
    }
    if (value instanceof Timestamp) {
      return dayjs.unix(value.seconds).format(format);
    }
    return dayjs(value, inputFormat).format(format);
  }
}
