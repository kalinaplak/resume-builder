import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'resume-header',
  imports: [MatIconModule],
  template: `
    @if(personalDetails){
      <div class="text-center">
        <h1 class="uppercase">
          {{ personalDetails.name }} {{ personalDetails.surname }}
        </h1>
        <div class="flex justify-center items-center gap-3">
          <div>{{ personalDetails.position }}</div>
          <div class="flex items-center justify-center gap-1">
            <mat-icon class="text-sm flex items-center justify-center">location_on</mat-icon>
            <span>{{ personalDetails.city }}, {{ personalDetails.country }}</span>
          </div>
          <div class="flex items-center justify-center gap-1">
            <mat-icon class="text-sm flex items-center justify-center">call</mat-icon>
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
