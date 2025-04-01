import { Component, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { dataFormsUtils } from './formImports';

@Component({
  selector: 'languages-data-form',
  imports: [
   ...dataFormsUtils,
    MatSliderModule,
  ],
  template: `
    <div class="flex flex-col gap-y-10">
      @for(language of languagesEntries; track language; let i = $index){
        <form #employmentForm="ngForm" class="flex flex-col gap-y-6">
          <div class="flex items-center gap-x-4 mb-4">
            <h3 class="font-semibold">Language entry {{i + 1}}</h3>
            <button class="flex items-center" (click)="removeEntry(i)" aria-label="Delete language">
              <mat-icon class="text-md flex items-center justify-center">delete</mat-icon>
            </button>
          </div>
            <mat-form-field class="w-full col-span-2">
              <mat-label>Name</mat-label>
              <input matInput name="name_{{i]}" [(ngModel)]="language.name" />
            </mat-form-field>
            <mat-slider min="0" max="5" step="1">
              <input name="value_{{i}}" matSliderThumb [(ngModel)]="language.level">
            </mat-slider>
        </form>
      }
      <button mat-flat-button (click)="addEntry()">Add language entry</button>
    </div>
  `
})

export class LanguagesDataFormComponent {
  @Input({ required: true }) languagesEntries!: LanguageDataEntry[];

  removeEntry(index: number){
    this.languagesEntries.splice(index,1);
  }

  addEntry(){
    this.languagesEntries.push({
			level: 0,
			name: ''
    });
  }
}