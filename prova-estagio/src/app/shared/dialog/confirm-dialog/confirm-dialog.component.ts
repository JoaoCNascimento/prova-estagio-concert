import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass']
})
export class ConfirmDialog {

  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialog>) { }

}
