import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncHandlerModule } from './shared/asyncHandler/asyncHandler.module';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule, 
    AsyncHandlerModule, 
    CommonModule, 
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    @let currentUser = auth.user();
    @let loading = auth.loading();
    @if(currentUser){
      <div class="flex flex-col gap-y-16 h-full">
        <div class="p-6 h-full flex flex-col">
          <router-outlet class="hidden"/>
        </div>
        <footer class="p-6 bg-neutral-200">
          <span>© 2025 Resume Generator.</span>
        </footer>
      </div>
    } 
    @if(!currentUser && !loading){
      <div class="flex flex-col justify-center items-center no-print">
        <button mat-flat-button (click)="login()">Sign in with Google to continue</button>
      </div>
    }
    @if(loading){
      <mat-spinner />
    }
  `,
  styles: [],
})
export class AppComponent {
  auth = inject(AuthService);

  login() {
    this.auth.loginWithGoogle().then(() => {
      console.log('Logged in!');
    });
  }

  logout() {
    this.auth.logout();
  }
}
