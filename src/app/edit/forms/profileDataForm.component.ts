import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'profile-data-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <form #profileForm="ngForm">
      <div class="grid grid-cols-2 gap-4">
        <mat-form-field class="w-full">
          <mat-label>First name</mat-label>
          <input matInput name="name" [(ngModel)]="personalDetails.name" />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Last name</mat-label>
          <input matInput name="surname" [(ngModel)]="personalDetails.surname" />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>E-mail</mat-label>
          <input matInput name="email" [(ngModel)]="personalDetails.email"/>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Phone</mat-label>
          <input matInput name="phone" [(ngModel)]="personalDetails.phone"/>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>City</mat-label>
          <input matInput name="city" [(ngModel)]="personalDetails.city"/>
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Country</mat-label>
          <input matInput name="country" [(ngModel)]="personalDetails.country" />
        </mat-form-field>
        <mat-form-field class="w-full">
          <mat-label>Position</mat-label>
          <input matInput name="position" [(ngModel)]="personalDetails.position"/>
        </mat-form-field>
        <mat-form-field class="w-full col-span-2">
          <mat-label>Summary</mat-label>
          <textarea matInput name="summary" [(ngModel)]="personalDetails.summary"></textarea>
        </mat-form-field>
      </div>
  
    </form>
  `
})

export class ProfileDataFormComponent {
  @Input({ required: true }) personalDetails!: PersonalDetailsData;
}