import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  standalone: false,
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.scss'
})
export class ErrorDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit() {}

}
