import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OrderByPipe } from '../../shared/orderBy.pipe';

@Component({
  selector: 'resume-details-skill-list',
  imports: [MatProgressBarModule, OrderByPipe],
  template: `
    <ul class="flex flex-col gap-y-3">
      @for(skill of skills | orderBy:'level':'desc'; track skill){
        <li class="flex flex-col gap-y-1">
          <div>{{ skill.name }}</div>
          <mat-progress-bar mode="determinate" [value]="skill.level * 20" />
        </li>
      }
    </ul>
  `,
  host: { class: 'block mb-2 mt-2' },
})
export class ResumeDatialsSkillListComponent {
  @Input({ required: true }) skills: { name: string; level: number }[] = [];
}
