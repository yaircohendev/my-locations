import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: string = 'OK'): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
