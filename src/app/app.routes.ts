import { Routes } from '@angular/router';
import { ResumeDetailsComponent } from './resumeDetails.component';
import { ResumeListComponent } from './list/resumeList.component';

export const routes: Routes = [
  {
    path: 'resume-builder', children: [
      { path: 'list', component: ResumeListComponent },
      { path: 'resume/:id', component: ResumeDetailsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'list' },
    ]
  },

  { path: '', pathMatch: 'full', redirectTo: '/resume-builder/list' }
];
