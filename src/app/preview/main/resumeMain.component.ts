import { Component, Input } from '@angular/core';
import { ResumeEmploymentComponent } from './employment/resumeEmployment.component';
import { ResumeEducationComponent } from './resumeEducation.component';
import { ResumeMainSectionComponent } from './resumeMainSection.component';

@Component({
  selector: 'resume-main',
  imports: [
    ResumeEmploymentComponent,
    ResumeEducationComponent,
    ResumeMainSectionComponent,
  ],
  template: `
    @if(resumeData){
			<div class="flex flex-col gap-y-5">
				<resume-main-section icon="person" sectionTitle="Profile">
					<p>{{ resumeData.personalDetails.summary }}</p>
				</resume-main-section>
				<resume-main-section icon="work" sectionTitle="Employment history">
					<resume-employment [employment]="resumeData.employment" />
				</resume-main-section>
				<resume-main-section icon="school" sectionTitle="Education">
					<resume-education [educationData]="resumeData.education" />
				</resume-main-section>
			</div>
    }
  `,
})
export class ResumeMainComponent {
  @Input({ required: true }) resumeData: ResumeData | undefined;
}
