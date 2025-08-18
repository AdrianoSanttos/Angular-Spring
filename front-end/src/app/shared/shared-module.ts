import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialog } from './components/error-dialog/error-dialog';
import { AppMaterialModule } from './app-material/app-material-module';
import { CategoryPipe } from './pipes/category-pipe';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog';

@NgModule({
  declarations: [
    ErrorDialog,
    CategoryPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ConfirmationDialog
  ],
  exports: [
    ErrorDialog,
    CategoryPipe,
    ConfirmationDialog
  ],
})
export class SharedModule { }
