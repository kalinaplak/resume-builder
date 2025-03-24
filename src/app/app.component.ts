import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncHandlerModule } from './shared/asyncHandler/asyncHandler.module';

@Component({
  selector: 'app-root',
  imports: [RouterModule, AsyncHandlerModule],
  template: `
    <div class="flex flex-col gap-y-16">
      <router-outlet class="hidden"/>
      <footer class="p-6 bg-neutral-200">
        <span>© 2025 Resume Generator.</span>
      </footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {
}
