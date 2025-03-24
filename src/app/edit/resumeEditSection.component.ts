import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'resume-edit-section',
  imports: [
    MatExpansionModule,
    MatIconModule,
  ],
  template: `
    <mat-expansion-panel [expanded]="currentStep === sectionStep" (opened)="onStepChanged.emit(sectionStep)">
      <mat-expansion-panel-header>
        <mat-panel-title class="flex gap-x-2"> 
          <mat-icon class="text-lg">{{icon}}</mat-icon>
          <span>{{sectionTitle}}</span>
        </mat-panel-title>
      </mat-expansion-panel-header>
      <ng-content />
    </mat-expansion-panel>
  `,
  host: { class: 'block' }
})

export class ResumeEditSectionComponent {
  @Input({ required: true }) currentStep!: number;
  @Input({ required: true }) sectionStep!: number;
  @Input({ required: true }) sectionTitle!: string;
  @Input({ required: true }) icon!: string;
  @Output() onStepChanged = new EventEmitter();
}