import { Component, inject, OnInit } from '@angular/core';
import { ResumePreviewComponent } from './preview/resumePreview.component';
import { ResumeDataComponent } from './edit/reumeEdit.component';
import { MatButtonModule } from '@angular/material/button';
import { AsyncHandler } from './shared/asyncHandler/asyncHandler.decorator';
import { ResumeDataService } from './resumeData.service';

@Component({
  selector: 'resume-details',
  imports: [ResumePreviewComponent, ResumeDataComponent, MatButtonModule],
  template: `
    <div class="flex flex-col gap-y-3">
      <div class="no-print flex justify-end w-full gap-x-3 pt-3 pr-6">
        <button class="no-print" mat-flat-button (click)="generatePDF()">Download PDF</button>
      </div>
      <div class="grid grid-cols-[1fr_220mm] gap-x-4">
        @if(resumeData){
          <resume-edit class="no-print pl-6 flex" [resumeData]="resumeData"/>
          <resume-preview class="self-start sticky top-0" [resumeData]="resumeData"/>
        }
      </div>
    </div>
  `
})

export class ResumeDetailsComponent implements OnInit {
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