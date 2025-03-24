import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApplyPipe } from '../shared/pipes/apply.pipe';
import { Timestamp } from 'firebase/firestore';
import dayjs from 'dayjs';

@Component({
  selector: 'employment-edit-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ApplyPipe
  ],
  template: ` 
    <div class="flex flex-col gap-y-10">
      @for(employment of employmentEntries; track employment; let i = $index){
        <form #employmentForm="ngForm">
          <h3 class="font-semibold mb-4">History entry</h3>
          <div class="grid grid-cols-2 gap-4">
            <mat-form-field class="w-full col-span-2">
              <mat-label>Position</mat-label>
              <input matInput name="position_{{i]}" [(ngModel)]="employment.position" />
            </mat-form-field>
            <mat-form-field class="w-full">
              <mat-label>Employer</mat-label>
              <input matInput name="employer_{{i]}" [(ngModel)]="employment.employer" />
            </mat-form-field>
            <mat-form-field class="w-full">
              <mat-label>City</mat-label>
              <input matInput name="city_{{i]}" [(ngModel)]="employment.city" />
            </mat-form-field>
            <div>
              <mat-form-field class="w-full">
                <mat-label>Start date</mat-label>
                <input matInput 
                  [matDatepicker]="startDate" 
                  (focus)="startDate.open()" 
                  readonly 
                  name="startDate_{{i]}" 
                  [ngModel]="employment.startDate | applyFn:mapTimestampToDate"
                  (ngModelChange)="employment.startDate = mapDateToTimestamp($event)"/>
              </mat-form-field>
              <mat-datepicker #startDate />
            </div>
            <div>
              <mat-form-field class="w-full">
                <mat-label>End date</mat-label>
                <input matInput 
                  [matDatepicker]="endDate" 
                  (focus)="endDate.open()" 
                  readonly 
                  name="endDate_{{i]}" 
                  [ngModel]="employment.endDate | applyFn:mapTimestampToDate"
                  (ngModelChange)="employment.endDate = mapDateToTimestamp($event)"/>
              </mat-form-field>
              <mat-datepicker #endDate />
            </div>
          </div>
          @for(project of employment.projects | applyFn:mapSingleStringIntoObject; track project; let j = $index){
            <mat-form-field class="w-full col-span-2">
              <mat-label>Project</mat-label>
              <textarea matInput name="project_{{i}}_{{j}}" [(ngModel)]="project.value"></textarea>
            </mat-form-field>
          }
          @for(achievement of employment.achievements | applyFn:mapSingleStringIntoObject; track achievement; let j = $index){
            <mat-form-field class="w-full col-span-2">
              <mat-label>Achievement</mat-label>
              <textarea matInput name="achievement_{{i}}_{{j}}" [(ngModel)]="achievement.value"></textarea>
            </mat-form-field>
          }
        </form>
      }
    </div>
  `,
  styles: [`
    .separator{
      height: 1px;
    }  
  `]
})

export class EmploymentEditFormComponent {
  @Input({ required: true }) employmentEntries!: EmploymentDataEntry[];

  mapSingleStringIntoObject(entries: string[]) {
    return entries ? [...entries.map(entry => ({ value: entry }))] : [];
  }

  mapTimestampToDate(timestamp: Timestamp) {
    return timestamp ? dayjs.unix(timestamp?.seconds).toDate() : undefined;
  }

  mapDateToTimestamp(date: Date) {
    return Timestamp.fromDate(date);
  }
}