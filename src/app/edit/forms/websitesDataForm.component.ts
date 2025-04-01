import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'websites-data-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <form #profileForm="ngForm">
      <mat-form-field class="w-full">
        <mat-label>Github</mat-label>
        <input matInput name="github" [(ngModel)]="websites.github" />
      </mat-form-field>
      <mat-form-field class="w-full">
        <mat-label>LinkedIn</mat-label>
        <input matInput name="linkedin" [(ngModel)]="websites.linkedin" />
      </mat-form-field>
    </form>
  `
})

export class WebsitesDataFormComponent {
  @Input({ required: true }) websites!: WebsiteData;
}