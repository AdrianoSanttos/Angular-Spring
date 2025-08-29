import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.html',
    styleUrl: './error-dialog.scss',
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class ErrorDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {}

}
