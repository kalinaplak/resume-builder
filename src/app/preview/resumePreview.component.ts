import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ResumeDataService } from '../data/resumeData.service';
import { AsyncHandler } from '../shared/asyncHandler.decorator';
import { ResumeDetailsComponent } from './details/resumeDetails.component';
import { ResumeMainComponent } from './main/resumeMain.component';
import { ResumeHeaderComponent } from './resumeHeader.component';

@Component({
  selector: 'resume-preview',
  imports: [
    CommonModule,
    ResumeHeaderComponent,
    ResumeMainComponent,
    ResumeDetailsComponent,
    MatButtonModule
  ],
  template: `
    <div class="flex flex-col items-center gap-y-3">
      <button class="no-print" mat-button (click)="generatePDF()">Download PDF</button>
      <div class="a4-preview relative overflow-hidden bg-white shadow-xl border border-gray-200">
        @if(resumeData){
          <div class="flex flex-col gap-y-6">
            <resume-header [personalDetails]="resumeData.personalDetails" />
            <div class="grid grid-cols-[1fr_6fr] gap-x-8">
              <resume-details [resumeData]="resumeData" />
              <resume-main [resumeData]="resumeData" />
            </div>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex items-center justify-center' },
  styles: [
    `
      .a4-preview {
        width: 210mm;
        height: 296mm;
        padding: 10mm 15mm;
      }
    `,
  ],
})
export class ResumePreviewComponent {
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

  generatePDF() {
    window.print();
  }
}
