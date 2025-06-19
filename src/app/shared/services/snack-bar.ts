import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  Success(message: string, duration: number = 3000) {
    this.snackBar.open(message, '✖', {
      duration,
      panelClass: "snackbar-success",
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  Error(message: string, duration: number = 3000) {
    this.snackBar.open(message, '✖', {
      duration,
      panelClass: "snackbar-error",
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  Info(message: string, duration: number = 3000) {
    this.snackBar.open(message, '✖', {
      duration,
      panelClass:"snackbar-info",
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  Warning(message: string, duration: number = 3000) {
    this.snackBar.open(message, '✖', {
      duration,
      panelClass: "snackbar-warning",
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
