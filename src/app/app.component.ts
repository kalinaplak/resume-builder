import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { AsyncHandlerModule } from './shared/asyncHandler.module';

@Component({
  selector: 'app-root',
  imports: [MatTabsModule, RouterModule, AsyncHandlerModule],
  template: `
    <nav mat-tab-nav-bar [tabPanel]="tabPanel" class="no-print mb-6">
      @for (link of links; track link) {
        <a mat-tab-link
          [routerLink]="link.path"
          routerLinkActive #rla="routerLinkActive"
          [active]="rla.isActive">
          {{link.label}}
        </a>
      }
    </nav>
    <mat-tab-nav-panel class="no-print" #tabPanel />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  activeLink: string = 'Preview';
  links = [
    { label: 'Preview', path: ['preview'] },
    { label: 'Data', path: ['data'] }
  ];
}
