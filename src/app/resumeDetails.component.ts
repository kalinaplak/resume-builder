import { Component, inject, OnInit } from '@angular/core';
import { ResumePreviewComponent } from './preview/resumePreview.component';
import { ResumeDataComponent } from './edit/reumeEdit.component';
import { AsyncHandler } from './shared/asyncHandler/asyncHandler.decorator';
import { ResumeDataService } from './resumeData.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'resume-details',
  imports: [
    ResumePreviewComponent,
    ResumeDataComponent,
    MatProgressSpinnerModule,
  ],
  template: `
    @let resumeData = resumeService.resumeData();
    <div class="grid grid-cols-[1fr_220mm] gap-x-4">
      @if(!isLoading){
        @if(resumeData){
          <resume-edit class="no-print flex" [resumeData]="resumeData"/>
          <resume-preview class="flex items-center justify-end sticky top-0" [resumeData]="resumeData"/>
        }
      } @else {
        <mat-spinner />
      }
    </div>
  `
})

export class ResumeDetailsComponent implements OnInit {
  resumeService = inject(ResumeDataService);
  private route = inject(ActivatedRoute);

  id: string = this.route.snapshot.params['id'];
  isLoading = false;

  @AsyncHandler({
    errorMessage: 'Failed to load resume data',
    successMessage: 'Resume data loaded successfully',
    loadingProperty: 'isLoading',
  })
  async ngOnInit() {
    await this.resumeService.loadResume(this.id);
  }
}