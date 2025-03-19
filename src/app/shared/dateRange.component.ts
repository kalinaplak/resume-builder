import { Component, Input } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { FormatDatePipe } from './formatDate.pipe';

@Component({
  selector: 'date-range',
  imports: [FormatDatePipe],
  template: `
    <div class="text-gray-500">
      {{ startDate | formatDate : format }} &mdash;
      @if(endDate){ 
        {{ endDate | formatDate : format }} 
      }
      @else { 
        Present 
      }
    </div>
  `
})

export class DateRangeComponent {
  @Input({required: true}) startDate: string | Date | Timestamp = new Date();
  @Input() endDate: string | Date | Timestamp | undefined;
  @Input() format: string = 'MMMM YYYY'
}