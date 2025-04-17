import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'hobbies-data-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <form #profileForm="ngForm">
      <mat-form-field class="w-full">
        <mat-label>Description</mat-label>
        <textarea  matInput name="summary" [(ngModel)]="hobbies.description"></textarea>
      </mat-form-field>
    </form>
  `
})

export class HobbiesDataFormComponent {
  @Input({ required: true }) hobbies!: HobbiesData;
}