import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormatDatePipe } from '../shared/formatDate.pipe';

@Component({
  selector: 'resume-education',
  imports: [CommonModule, FormatDatePipe],
  template: `
    @if(educationData){
      <div class="education">
        <h2>Education</h2>
        @for(education of educationData; track education){
          <div class="entry">
            <h3>{{ education.degree }}, {{ education.school }}</h3>
            <div>
              {{ education.startDate | formatDate : 'MMMM YYYY' }} -
              {{ education.endDate | formatDate : 'MMMM YYYY' }}
            </div>
            <div>{{ education.description }}</div>
          </div>
        }
      </div>
    }
  `,
})
export class ResumeEducationComponent {
  @Input({ required: true }) educationData: EducationDataEntry[] | undefined;
}
