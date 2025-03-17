import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ResumeDataService } from '../data/resumeData.service';
import { AsyncHandler } from '../shared/asyncHandler.decorator';
import { ResumeEducationComponent } from "./resumeEducation.component";
import { ResumeEmploymentComponent } from "./resumeEmployment.component";
import { ResumeHeaderComponent } from './resumeHeader.component';

@Component({
  selector: 'resume-preview',
  imports: [CommonModule, ResumeHeaderComponent, ResumeEmploymentComponent, ResumeEducationComponent],
  template: `
    <div id="pdf-content" class="a4-preview relative overflow-hidden bg-white shadow-xl border border-gray-200 mt-6 mb-6">
      @if(resumeData){
        <resume-header [personalDetails]="resumeData.personalDetails" />
        <div class="content grid grid-cols-[1fr_5fr] gap-x-8">
          <div class="details text-center">
            <div class="details-section">
              <h2>◦ Details ◦</h2>
              <div>{{resumeData.personalDetails.city}}</div>
              <div>{{resumeData.personalDetails.country}}</div>
              <div>
                <a [href]="'tel:'+ resumeData.personalDetails.phone">
                  {{resumeData.personalDetails.phone}}
                </a>
              </div>
              <div>
                <a [href]="'mailto:' + resumeData.personalDetails.email">
                  {{resumeData.personalDetails.email}}
                </a>
              </div>
            </div>
            <div class="details-section">
              <h2>◦ Links ◦</h2>
              <div>
                <a [href]="resumeData.websites.github">Github</a>
              </div>
              <div>
                <a [href]="resumeData.websites.linkedin">LinkedIn</a>
              </div>
            </div>
            <div class="details-section">
              <h2>◦ Skills ◦</h2>
              @for(skill of resumeData.skills; track skill){
                <div class="skill">
                  <div class="name">{{skill.name}}</div>
                  <div class="progress">{{skill.level}}</div>
                </div>
              }
            </div>
            <div class="details-section">
              <h2>◦ Languages ◦</h2>
              @for(lang of resumeData.languages; track lang){
                <div class="skill">
                  <div class="name">{{lang.name}}</div>
                  <div class="progress">{{lang.level}}</div>
                </div>
              }
            </div>
            <div class="details-section">
              <h2>◦ Hobbies ◦</h2>
              <div>{{resumeData.hobbies.description}}</div>
            </div>
          </div>
          <div class="main">
            <div class="profile">
              <h2>Profile</h2>
              <p>{{resumeData.personalDetails.summary}}</p>
            </div>
            <resume-employment [employment]="resumeData.employment" />
            <resume-education [educationData]="resumeData.education" />
          </div>
        </div>
      }
    </div>
  `,
  host: { class: 'flex items-center justify-center' },
  styles: [
    `
      .a4-preview {
        width: 210mm;
        height: 296mm;
        padding: 10mm 20mm;
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
}
