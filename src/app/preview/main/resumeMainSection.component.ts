import { Component, Input } from '@angular/core';

@Component({
  selector: 'resume-main-section',
  template: `
    <div class="grid grid-cols-[15px_1fr] gap-x-3">
      <div class="flex flex-col items-center h-full gap-y-5">
        <i class="material-icons text-base" aria-hidden="true">{{ icon }}</i>
        <div class="flex flex-col items-center justify-center h-full">
          <div class="circle rounded-full border border-gray-950 shrink-0"></div>
          <div class="line bg-gray-950 h-full">&nbsp;</div>
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
        width: 1px;
      }
    `,
  ],
})
export class ResumeMainSectionComponent {
  @Input({ required: true }) icon: string | undefined;
  @Input({ required: true }) sectionTitle: string | undefined;
}
