import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DateRangeComponent } from '../../shared/dateRange.component';

@Component({
  selector: 'resume-education',
  imports: [CommonModule, DateRangeComponent],
  template: `
    @if(educationData){
      <ul class="flex flex-col gap-y-4">
      @for(education of educationData; track education){
        <li>
          <h3>{{ education.degree }}, {{ education.school }}</h3>
          <date-range [startDate]="education.startDate" [endDate]="education.endDate" />
          <div>{{ education.description }}</div>
        </li>
      }
      </ul>
    }
  `,
})
export class ResumeEducationComponent {
  @Input({ required: true }) educationData: EducationDataEntry[] | undefined;
}
