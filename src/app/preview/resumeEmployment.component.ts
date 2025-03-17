import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormatDatePipe } from '../shared/formatDate.pipe';

@Component({
  selector: 'resume-employment',
  imports: [CommonModule, FormatDatePipe],
  template: `
    @if(employment){
      <div class="history">
        <h2>Employment history</h2>
        @for(history of employment; track history){
          <h3>
            {{ history.position }} at {{ history.employer }}, {{ history.city }}
          </h3>
          <span>
            {{ history.startDate | formatDate : 'MMMM YYYY' }} -
            @if(history.endDate){ {{ history.endDate | formatDate : 'MMMM YYYY' }} }
            @else { Present }
          </span>
          <div class="description">
            <div>
              @if(history.achievements){ 
                <label class="underline">Projects:</label> 
              }
              <ul>
                @for(project of history.projects; track project;){
                  <li class="list-disc">{{ project }}</li>
                }
              </ul>
            </div>
            @if(history.achievements){
              <div>
                <label class="underline">Achievements:</label>
                <ul>
                  @for(achievement of history.achievements; track achievement){
                    <li class="list-disc">{{ achievement }}</li>
                  }
                </ul>
              </div>
            }
          </div>
        }
      </div>
    }
  `,
})
export class ResumeEmploymentComponent {
  @Input({ required: true }) employment: EmploymentDataEntry[] | undefined;
}
