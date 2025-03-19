import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ResumeDetailsSectionComponent } from './resumeDetailsSection.component';
import { ResumeDatialsSkillListComponent } from './resumeDetailsSkillList.component';
import { ResumeDetailsPersonalDataComponent } from './resumeDetailsPersonalData.component';

@Component({
  selector: 'resume-details',
  imports: [
    CommonModule,
    ResumeDetailsSectionComponent,
    ResumeDatialsSkillListComponent,
    ResumeDetailsPersonalDataComponent,
  ],
  template: `
    @if(resumeData){
			<div class="text-center flex flex-col gap-y-5">
				<resume-details-section sectionTitle="Details">
					<resume-details-personal-data [personalDetails]="resumeData.personalDetails" />
				</resume-details-section>
				<resume-details-section sectionTitle="Links">
					<div class="flex flex-col">
						<a [href]="resumeData.websites.github">Github</a>
						<a [href]="resumeData.websites.linkedin">LinkedIn</a>
					</div>
				</resume-details-section>
				<resume-details-section sectionTitle="Skills">
					<resume-details-skill-list [skills]="resumeData.skills" />
				</resume-details-section>
				<resume-details-section sectionTitle="Languages">
					<resume-details-skill-list [skills]="resumeData.languages" />
				</resume-details-section>
				<resume-details-section sectionTitle="Hobbies">
					<div>{{ resumeData.hobbies.description }}</div>
				</resume-details-section>
			</div>
    }
  `,
})
export class ResumeDetailsComponent {
  @Input({ required: true }) resumeData: ResumeData | undefined;
}
