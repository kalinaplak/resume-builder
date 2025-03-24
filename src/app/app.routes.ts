import { Routes } from '@angular/router';
import { ResumeDetailsComponent } from './resumeDetails.component';

export const routes: Routes = [
  { path: 'resume', component: ResumeDetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'resume' }
];
