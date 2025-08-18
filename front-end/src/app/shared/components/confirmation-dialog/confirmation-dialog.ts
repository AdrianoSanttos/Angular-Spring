import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.html',
    styleUrls: ['./confirmation-dialog.scss'],
    standalone: true,
    imports: [
      MatDialogContent,
      MatDialogActions,
      MatButtonModule
    ]
})
export class ConfirmationDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit(): void {
  }

  // Close the dialog and return the result
  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
