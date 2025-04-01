import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { dataForms } from './forms/formImports';
import { ResumeEditSectionComponent } from './resumeEditSection.component';

@Component({
  selector: 'resume-edit',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ResumeEditSectionComponent,
    ...dataForms
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    @if(resumeData){
      <div class="flex flex-col w-full gap-y-6">
        <resume-edit-section [currentStep]="step()" [sectionStep]="0" sectionTitle="Personal details" icon="account_circle" (stepChanged)="setStep($event)">  
          <profile-data-form [personalDetails]="resumeData.personalDetails" />
        </resume-edit-section>
        <resume-edit-section [currentStep]="step()" [sectionStep]="1" sectionTitle="Employment history" icon="work" (stepChanged)="setStep($event)">
          <employment-data-form [employmentEntries]="resumeData.employment" />
        </resume-edit-section>
        <resume-edit-section [currentStep]="step()" [sectionStep]="2" sectionTitle="Education history" icon="school" (stepChanged)="setStep($event)">
          <education-data-form [educationEntries]="resumeData.education" />
        </resume-edit-section>
        <resume-edit-section [currentStep]="step()" [sectionStep]="3" sectionTitle="Skills" icon="star_half" (stepChanged)="setStep($event)">
          <skills-data-form [skillsEntries]="resumeData.skills" />
        </resume-edit-section>
        <resume-edit-section [currentStep]="step()" [sectionStep]="4" sectionTitle="Websites" icon="language" (stepChanged)="setStep($event)">
          <websites-data-form [websites]="resumeData.websites" />
        </resume-edit-section>
        <resume-edit-section [currentStep]="step()" [sectionStep]="5" sectionTitle="Languages" icon="translate" (stepChanged)="setStep($event)">
          <languages-data-form [languagesEntries]="resumeData.languages" />
        </resume-edit-section>
        <resume-edit-section [currentStep]="step()" [sectionStep]="6" sectionTitle="Hobbies" icon="sports_esports" (stepChanged)="setStep($event)">
          <hobbies-data-form [hobbies]="resumeData.hobbies" />
        </resume-edit-section>
      </div>
    }
  `,
})
export class ResumeDataComponent {
  @Input({ required: true }) resumeData!: ResumeData;
  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update(i => i + 1);
  }

  prevStep() {
    this.step.update(i => i - 1);
  }
}
