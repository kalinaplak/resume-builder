import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncHandler } from '../shared/asyncHandler/asyncHandler.decorator';
import { ResumeDataService } from './resumeData.service';
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
    ResumeEditSectionComponent
  ],
  providers: [provideNativeDateAdapter()],
  template: `
    @if(isLoading) {
      <mat-spinner color="accent" />
    } @else {
      <div class="flex flex-col w-full gap-y-4">
        <resume-edit-section [currentStep]="step()" [sectionStep]="0" sectionTitle="Personal details" icon="account_circle" (onStepChanged)="setStep($event)">  
          <div class="flex gap-x-5 w-full">
            <mat-form-field class="w-full">
              <mat-label>First name</mat-label>
              <input matInput />
            </mat-form-field>
            <mat-form-field class="w-full">
              <mat-label>Age</mat-label>
              <input matInput type="number" min="1" />
            </mat-form-field>
          </div>
        </resume-edit-section>

        <resume-edit-section [currentStep]="step()" [sectionStep]="1" sectionTitle="Employment history" icon="work" (onStepChanged)="setStep($event)">
          <div class="flex gap-x-5 w-full">
            <mat-form-field class="w-full">
              <mat-label>Country</mat-label>
              <input matInput />
            </mat-form-field>
          </div>
        </resume-edit-section>

        <resume-edit-section [currentStep]="step()" [sectionStep]="2" sectionTitle="Education history" icon="school" (onStepChanged)="setStep($event)">
          <div class="flex gap-x-5 w-full">
            <mat-form-field class="w-full">
              <mat-label>Date</mat-label>
              <input matInput [matDatepicker]="picker" (focus)="picker.open()" readonly />
            </mat-form-field>
            <mat-datepicker #picker></mat-datepicker>
          </div>
        </resume-edit-section>

        <resume-edit-section [currentStep]="step()" [sectionStep]="3" sectionTitle="Skills" icon="star_half" (onStepChanged)="setStep($event)">
          <div class="flex gap-x-5 w-full">
            <mat-form-field class="w-full">
              <mat-label>Country</mat-label>
              <input matInput />
            </mat-form-field>
          </div>
        </resume-edit-section>

        <resume-edit-section [currentStep]="step()" [sectionStep]="4" sectionTitle="Websites" icon="language" (onStepChanged)="setStep($event)">
          <div class="flex gap-x-5 w-full">
            <mat-form-field class="w-full">
              <mat-label>Country</mat-label>
              <input matInput />
            </mat-form-field>
          </div>
        </resume-edit-section>

        <resume-edit-section [currentStep]="step()" [sectionStep]="5" sectionTitle="Languages" icon="translate" (onStepChanged)="setStep($event)">
          <div class="flex gap-x-5 w-full">
            <mat-form-field class="w-full">
              <mat-label>Country</mat-label>
              <input matInput />
            </mat-form-field>
          </div>
        </resume-edit-section>

        <resume-edit-section [currentStep]="step()" [sectionStep]="6" sectionTitle="Hobbies" icon="sports_esports" (onStepChanged)="setStep($event)">
          <div class="flex gap-x-5 w-full">
            <mat-form-field class="w-full">
              <mat-label>Country</mat-label>
              <input matInput />
            </mat-form-field>
          </div>  
        </resume-edit-section>
      </div>
    }
  `,
})
export class ResumeDataComponent {
  resumeService = inject(ResumeDataService);
  resumeData: ResumeData | undefined;
  isLoading = false;
  step = signal(0);

  @AsyncHandler({
    errorMessage: 'Failed to load resume data',
    successMessage: 'Resume data loaded successfully',
    loadingProperty: 'isLoading',
  })
  async ngOnInit() {
    this.resumeData = await this.resumeService.loadResume();
  }

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
