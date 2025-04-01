import { Component, Input } from '@angular/core';
import { mapDateToTimestamp, mapTimestampToDate } from '../../shared/helpers';
import { ApplyPipe } from '../../shared/pipes/apply.pipe';
import { dataFormsUtils } from './formImports';

@Component({
  selector: 'education-data-form',
  imports: [
  ...dataFormsUtils,
    ApplyPipe,
  ],
  template: `
    <div class="flex flex-col gap-y-10">
      @for(education of educationEntries; track education; let i = $index){
        <form #employmentForm="ngForm" class="flex flex-col gap-y-6">
          <div class="flex items-center gap-x-4">
            <h3 class="font-semibold">Education entry {{i + 1}}</h3>
            <button class="flex items-center" (click)="removeEntry(i)" aria-label="Delete education entry">
              <mat-icon class="text-md flex items-center justify-center">delete</mat-icon>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <mat-form-field class="w-full col-span-2">
              <mat-label>Degree</mat-label>
              <input matInput name="degree_{{i]}" [(ngModel)]="education.degree" />
            </mat-form-field>
            <mat-form-field class="w-full">
              <mat-label>School</mat-label>
              <input matInput name="school_{{i]}" [(ngModel)]="education.school" />
            </mat-form-field>
            <div>
              <mat-form-field class="w-full">
                <mat-label>Start date</mat-label>
                <input matInput 
                  [matDatepicker]="startDate" 
                  (focus)="startDate.open()" 
                  readonly 
                  name="startDate_{{i]}" 
                  [ngModel]="education.startDate | applyFn:mapTimestampToDate"
                  (ngModelChange)="education.startDate = mapDateToTimestamp($event)"/>
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
                  [ngModel]="education.endDate | applyFn:mapTimestampToDate"
                  (ngModelChange)="education.endDate = mapDateToTimestamp($event)"/>
              </mat-form-field>
              <mat-datepicker #endDate />
            </div>
            <mat-form-field class="w-full col-span-2">
              <mat-label>Description</mat-label>
              <textarea matInput name="description_{{i}}" [(ngModel)]="education.description"></textarea>
            </mat-form-field>
          </div>
        </form>
      }
      <button mat-flat-button (click)="addEntry()">Add education entry</button>
    </div>
  `
})

export class EducationDataFormComponent  {
  @Input({ required: true }) educationEntries!: EducationDataEntry[];
  mapTimestampToDate = mapTimestampToDate;
  mapDateToTimestamp = mapDateToTimestamp;

  addEntry(){
    this.educationEntries.push({
      degree:'',
      school: '',
      startDate: null,
      endDate: null,
      description: '',
    });
  }

  removeEntry(index: number){
    this.educationEntries.splice(index,1);
  }
}