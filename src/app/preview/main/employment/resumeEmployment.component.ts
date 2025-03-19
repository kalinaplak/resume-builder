import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ResumeEmploymentHistoryHeaderComponent } from './resumeEmploymentHeader.component';
import { ResumeEmploymentListComponent } from './resumeEmploymentList.component';

@Component({
  selector: 'resume-employment',
  imports: [CommonModule, ResumeEmploymentHistoryHeaderComponent, ResumeEmploymentListComponent],
  template: `
    @if(employment){
      <ul class="flex flex-col gap-y-4">
      @for(history of employment; track history){
        <li class="flex flex-col gap-y-1">
          <resume-employment-header [history]="history"/>
          <resume-employment-list 
            [sectionTitle]="history.achievements ? 'Projects:' : undefined" 
            [entries]="history.projects"/>
          <resume-employment-list 
            sectionTitle="Achievements:"
            [entries]="history.achievements" />
        </li>
      }
      </ul>
    }
  `,
})
export class ResumeEmploymentComponent {
  @Input({ required: true }) employment: EmploymentDataEntry[] | undefined;
}
