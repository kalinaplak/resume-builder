import { Component, Input } from '@angular/core';

@Component({
  selector: 'resume-details-section',
  template: `
    <h2>◦ {{ sectionTitle }} ◦</h2>
    <ng-content />
  `,
})
export class ResumeDetailsSectionComponent {
  @Input({ required: true }) sectionTitle: string | undefined;
}
