import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'resume-main-section',
  imports: [MatIconModule],
  template: `
    <div class="grid grid-cols-[15px_1fr] gap-x-3">
      <div class="flex flex-col items-center h-full gap-y-5">
        <mat-icon class="text-base flex items-center justify-center">{{ icon }}</mat-icon>
        <div class="flex flex-col items-center justify-center h-full">
          <div class="circle rounded-full border border-gray-950 shrink-0"></div>
          <div class="line h-full">&nbsp;</div>
        </div>
      </div>
      <div class="flex flex-col gap-y-2">
				<h2>{{sectionTitle}}</h2>
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      .circle {
        width: 5px;
        height: 5px;
      }
      .line {
        margin-left: -2px;
        border-right: 1px solid #000;
      }
    `,
  ],
})
export class ResumeMainSectionComponent {
  @Input({ required: true }) icon: string | undefined;
  @Input({ required: true }) sectionTitle: string | undefined;
}
