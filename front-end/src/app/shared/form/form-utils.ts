import { Injectable } from '@angular/core';
import { FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtils {

  constructor() { }

  // Method to validate all form fields
  validateAllFormFields(FormGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(FormGroup.controls).forEach(field => {
      const control = FormGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        this.validateAllFormFields(control);
      }
    });
  }

  // Method to get error messages for form fields
  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  // Method to get error messages for form array fields
  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength'].requiredLength : 5;
      return `Mínimo de ${requiredLength} caracteres`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength'].requiredLength : 20 ;
      return `Máximo de ${requiredLength} caracteres`;
    }
    return 'Campo inválido';
  }

  // Method to get error messages for form array fields
  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string,
    fieldName: string, index: number){
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  // Method to check if the lessons form array is valid
  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }

}
