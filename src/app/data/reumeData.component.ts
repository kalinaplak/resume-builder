import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ResumeDataService } from './resumeData.service';
import { AsyncHandler } from '../shared/asyncHandler.decorator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'resume-Data',
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <mat-spinner *ngIf="isLoading" color="accent" />
    {{ resumeData | json }}
  `,
})
export class ResumeDataComponent {
  resumeService = inject(ResumeDataService);
  resumeData: ResumeData | undefined;
  isLoading = false;

  @AsyncHandler({
    errorMessage: 'Failed to load resume data',
    successMessage: 'Resume data loaded successfully',
    loadingProperty: 'isLoading',
  })
  async ngOnInit() {
    this.resumeData = await this.resumeService.loadResume();
  }
}
