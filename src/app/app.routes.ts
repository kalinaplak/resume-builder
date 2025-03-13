import { Routes } from '@angular/router';
import { ResumeDataComponent } from './data/reumeData.component';
import { ResumePreviewComponent } from './preview/resumePreview.component';

export const routes: Routes = [
  { path: 'data', component: ResumeDataComponent },
  { path: 'preview', component: ResumePreviewComponent },
  { path: '', pathMatch: 'full', redirectTo: 'preview' }
];
