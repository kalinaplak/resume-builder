import { Component, Input } from '@angular/core';
import { OrderByPipe } from '../../shared/pipes/orderBy.pipe';
import { ProgressBarComponent } from '../../shared/components/progressBar.component';

@Component({
  selector: 'resume-details-skill-list',
  imports: [ProgressBarComponent, OrderByPipe],
  template: `
    <ul class="flex flex-col gap-y-3">
      @for(skill of skills | orderBy:'level':'desc'; track skill){
        <li class="flex flex-col gap-y-1">
          <div>{{ skill.name }}</div>
          <progress-bar [progress]="skill.level * 20" color="black" />
          <!-- <mat-progress-bar mode="determinate" [value]="skill.level * 20" /> -->
        </li>
      }
    </ul>
  `,
  host: { class: 'block mb-2 mt-2' },
})
export class ResumeDatialsSkillListComponent {
  @Input({ required: true }) skills: { name: string; level: number }[] = [];
}
