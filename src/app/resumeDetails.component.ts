import { Component } from '@angular/core';
import { ResumePreviewComponent } from './preview/resumePreview.component';
import { ResumeDataComponent } from './edit/reumeEdit.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'resume-details',
  imports: [ResumePreviewComponent, ResumeDataComponent, MatButtonModule],
  template: `
    <div class="flex flex-col gap-y-3">
      <div class="no-print flex justify-end w-full gap-x-3 pt-3 pr-6">
        <button class="no-print" mat-flat-button (click)="generatePDF()">Download PDF</button>
      </div>
      <div class="grid grid-cols-[1fr_220mm] gap-x-4">
        <resume-edit class="no-print pl-6 flex"/>
        <resume-preview />
      </div>
    </div>
  `
})

export class ResumeDetailsComponent {
  generatePDF() {
    window.print();
  }
}