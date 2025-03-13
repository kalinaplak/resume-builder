import { Injector, NgModule } from '@angular/core';
import { AsyncHandlerService } from './asyncHandler.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [AsyncHandlerService],
})
export class AsyncHandlerModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AsyncHandlerModule.injector = injector;
  }
}
