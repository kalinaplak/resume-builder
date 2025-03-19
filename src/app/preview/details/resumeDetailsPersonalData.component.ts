import { Component, Input } from '@angular/core';

@Component({
  selector: 'resume-details-personal-data',
  template: `
    @if(personalDetails){
      <div class="flex flex-col">
        <span>{{ personalDetails.city }}</span>
        <span>{{ personalDetails.country }}</span>
        <a [href]="'tel:' + personalDetails.phone">
          {{ personalDetails.phone }}
        </a>
        <a [href]="'mailto:' + personalDetails.email">
          {{ personalDetails.email }}
        </a>
      </div>
    }
  `,
})
export class ResumeDetailsPersonalDataComponent {
  @Input({ required: true }) personalDetails: PersonalDetailsData | undefined;
}
