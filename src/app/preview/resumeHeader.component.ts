import { Component, Input } from '@angular/core';

@Component({
  selector: 'resume-header',
  template: `
    @if(personalDetails){
      <div class="text-center">
        <h1 class="uppercase">
          {{ personalDetails.name }} {{ personalDetails.surname }}
        </h1>
        <div class="flex justify-center items-center gap-3">
          <div>{{ personalDetails.position }}</div>
          <div class="flex items-center justify-center gap-1">
            <i class="material-icons text-sm" aria-hidden="true">location_on</i>
            <span>{{ personalDetails.city }}, {{ personalDetails.country }}</span>
          </div>
          <div class="flex items-center justify-center gap-1">
            <i class="material-icons text-sm" aria-hidden="true">call</i>
            <span>{{ personalDetails.phone }}</span>
          </div>
        </div>
      </div>
    }
  `,
})
export class ResumeHeaderComponent {
  @Input({ required: true }) personalDetails: PersonalDetailsData | undefined;
}
