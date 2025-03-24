import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AsyncHandlerService {
  #snackBar: MatSnackBar = inject(MatSnackBar);

  handleError(error: Error, errorMessage: string) {
    console.error(error);
    this.handleMessage(errorMessage, 'error');
  }

  handleSuccess(successMessage: string) {
    this.handleMessage(successMessage, 'success');
  }

  private handleMessage(message: string, type: 'success' | 'error') {
    if (!this.#snackBar) {
      return;
    }
    this.#snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: type
    });
  }


}
