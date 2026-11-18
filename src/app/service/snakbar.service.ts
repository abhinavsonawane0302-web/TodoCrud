import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnakbarService {

  constructor(private SnackBar:MatSnackBar  ) { }
 
  snackBar(msg: string) {
  this.SnackBar.open(msg, 'Close', {
    duration: 2500,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  });
}
}
