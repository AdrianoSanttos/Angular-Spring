import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-course-form',
  standalone: false,
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss'
})
export class CourseForm implements OnInit {

  form: FormGroup;

  constructor(

    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    // Initialize the form with default empty values
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required,
                  Validators.minLength(5),
                  Validators.maxLength(20)]],
      category: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Update the form with course data if available
    const course: Course = this.route.snapshot.data['course'];
    if (course) {
      this.form.setValue({
        id: course.id,
        name: course.name,
        category: course.category
      });
    }
  }

  // Method to handle form submission
  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: (result) => this.onSuccess(),
      error: () => { this.onError() }
    });
  }

  // Logic to handle cancellation can be implemented here
  onCancel() {
    this.location.back();
  }

  // Method to handle successful form submission
  private onSuccess() {
    this._snackBar.open('Curso salvo com sucesso!', 'X', { duration: 5000 });
    this.onCancel();
  }

  // Method to handle errors during form submission
  private onError() {
    this._snackBar.open('Erro ao salvar curso', 'X', { duration: 5000 });
  }

  // Method to get error messages for form fields
  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

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
    return '';
  }

}
