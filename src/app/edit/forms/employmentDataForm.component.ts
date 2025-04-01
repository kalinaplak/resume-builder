import { Component, Input } from '@angular/core';
import { mapDateToTimestamp, mapTimestampToDate } from '../../shared/helpers';
import { ApplyPipe } from '../../shared/pipes/apply.pipe';
import { dataFormsUtils } from './formImports';

@Component({
  selector: 'employment-data-form',
  imports: [
  ...dataFormsUtils,
    ApplyPipe,
  ],
  template: ` 
    <div class="flex flex-col gap-y-10">
      @for(employment of employmentEntries; track employment; let i = $index){
        <form #employmentForm="ngForm" class="flex flex-col gap-y-6">
          <div>
            <div class="flex items-center gap-x-4 mb-4">
              <h3 class="font-semibold">Employment entry {{i + 1}}</h3>
              <button class="flex items-center" (click)="removeEntry(i)" aria-label="Delete education entry">
                <mat-icon class="text-md flex items-center justify-center">delete</mat-icon>
              </button>
            </div>
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
          </div>
          <div>
            <h3 class="font-semibold mb-4">Projects</h3>
            @for(project of employment.projects | applyFn:mapSingleStringIntoObject; track project; let j = $index){
              <div class="flex items-center gap-x-4">
                <mat-form-field class="w-full col-span-2">
                  <mat-label>Project</mat-label>
                  <textarea matInput name="project_{{i}}_{{j}}" [ngModel]="project.value" (ngModelChange)="updateProject($event, employment, j)"></textarea>
                </mat-form-field>
                <button (click)="removeProject(employment, j)" aria-label="Delete project">
                  <mat-icon class="text-md flex items-center justify-center">delete</mat-icon>
                </button>
              </div>
            }
            <button mat-flat-button (click)="addProject(employment)">Add project</button>
          </div>
          <div>
            <h3 class="font-semibold mb-4">Achievements</h3>
            @for(achievement of employment.achievements | applyFn:mapSingleStringIntoObject; track achievement; let j = $index){
              <div class="flex items-center gap-x-4">
                <mat-form-field class="w-full col-span-2">
                  <mat-label>Achievement</mat-label>
                  <textarea matInput name="achievement_{{i}}_{{j}}" [ngModel]="achievement.value" (ngModelChange)="updateAchievement($event, employment, j)"></textarea>
                </mat-form-field>
                <button (click)="removeAchievement(employment, j)" aria-label="Delete achievement">
                  <mat-icon class="text-md flex items-center justify-center">delete</mat-icon>
                </button>
              </div>
            }
            <button mat-flat-button (click)="addAchievement(employment)">Add achievement</button>
          </div>
        </form>
      }
      <button mat-flat-button (click)="addEntry()">Add history entry</button>
    </div>
  `,
  styles: [`
    .separator{
      height: 1px;
    }  
  `]
})

export class EmploymentDataFormComponent {
  @Input({ required: true }) employmentEntries!: EmploymentDataEntry[];

  mapTimestampToDate = mapTimestampToDate;
  mapDateToTimestamp = mapDateToTimestamp;

  mapSingleStringIntoObject(entries: string[]) {
    return entries ? [...entries.map(entry => ({ value: entry }))] : [];
  }

  addEntry(){
    this.employmentEntries.push({
      city:'', 
      employer:'', 
      position: '', 
      startDate: null, 
      endDate: null,
      projects: [],
      achievements: [],
    })
  }

  removeEntry(index: number){
    this.employmentEntries.splice(index,1);
  }

  addProject(employment: EmploymentDataEntry){
    employment.projects = [...(employment.projects || []), ''];
  }

  updateProject(value: string, employment: EmploymentDataEntry,  index: number){
    employment.projects[index] = value;
  }

  removeProject(employment: EmploymentDataEntry, index: number){
    employment.projects.splice(index,1);
    employment.projects = structuredClone(employment.projects);
  }

  addAchievement(employment: EmploymentDataEntry){
    employment.achievements = [...(employment.achievements || []), ''];
  }

  updateAchievement(value: string, employment: EmploymentDataEntry,  index: number){
    employment.achievements[index] = value;
  }

  removeAchievement(employment: EmploymentDataEntry, index: number){
    employment.achievements.splice(index,1);
    employment.achievements = structuredClone(employment.achievements);
  }
}