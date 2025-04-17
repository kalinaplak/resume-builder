import { Component, Input } from '@angular/core';
import { ResumeDetailsComponent } from './details/resumeDetails.component';
import { ResumeMainComponent } from './main/resumeMain.component';
import { ResumeHeaderComponent } from './resumeHeader.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'resume-preview',
  imports: [
    ResumeHeaderComponent,
    ResumeMainComponent,
    ResumeDetailsComponent,
    MatButtonModule,
  ],
  template: `
    <div class="flex flex-col gap-y-6">
      <div class="no-print flex justify-end w-full gap-x-3">
        <button class="no-print" mat-flat-button (click)="generatePDF()">Download PDF</button>
      </div>
      <div class="a4-preview shadow-xl border border-gray-200 bg-white relative overflow-hidden">
        @if(resumeData){
          <div class="flex flex-col gap-y-6">
            <resume-header [personalDetails]="resumeData.personalDetails" />
            <div class="grid grid-cols-[1fr_6fr] gap-x-8">
              <resume-details [resumeData]="resumeData" />
              <resume-main [resumeData]="resumeData" />
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .a4-preview {
        width: 210mm;
        height: 296mm;
        padding: 10mm 15mm;
      }
      @media print {
        .a4-preview {
          box-shadow: none;
          border: none;
        }
      }
    `,
  ],
})
export class ResumePreviewComponent {
  @Input({ required: true }) resumeData!: ResumeData;

  generatePDF() {
    window.print();
  }
}
