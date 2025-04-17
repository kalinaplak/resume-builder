import { Component, inject, OnInit } from '@angular/core';
import { ResumeDataService } from '../resumeData.service';
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncHandler } from '../shared/asyncHandler/asyncHandler.decorator';
import { Router } from '@angular/router';
import { FormatDatePipe } from '../shared/pipes/formatDate.pipe';

@Component({
  selector: 'resume-list',
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    FormatDatePipe
  ],
  template: `
    @let loading = resumeService.loading;
    <div class="flex flex-col gap-y-4">
      <div class="flex justify-between items-center">
        <h1 class="font-semibold text-2xl">Resume List</h1>
        <button mat-flat-button (click)="addResume()">Create new resume</button>
      </div>
      @if(loading){
        <mat-spinner diameter="32" />
      } @else {
        <ul> 
          @for(resume of resumes; track resume.id){
          <li class="flex gap-x-4 justify-between items-center border-b border-gray-300 pt-4 pb-4">
            <span class="text-md"><b>{{ resume.title }}</b>, ID: {{resume.id}}, last modification date: {{resume.lastModificationDate | formatDate:'DD-MM-YYYY HH:mm'}}</span>
            <div class="flex gap-x-2">
              <button mat-flat-button (click)="navigateToEdit(resume.id)">Edit</button>
              <button mat-flat-button (click)="deleteResume(resume.id)">Delete</button>
            </div>
          </li>
          }
        </ul>
      }
    </div>
  `
})

export class ResumeListComponent implements OnInit {
  resumeService = inject(ResumeDataService);
  private router = inject(Router);

  resumes: ResumeListItem[] = [];

  @AsyncHandler({ loadingProperty: 'loading' })
  async ngOnInit() {
    this.resumes = await this.resumeService.loadResumes();
  }

  navigateToEdit(id: string) {
    this.router.navigate(['resume-builder', 'resume', id]);
  }

  async deleteResume(id: string) {
    await this.resumeService.deleteResume(id);
    this.resumes = this.resumes.filter(resume => resume.id !== id);
  }

  async addResume() {
    const id = await this.resumeService.createResume()
    this.router.navigate(['resume-builder', 'resume', id]);
  }

}