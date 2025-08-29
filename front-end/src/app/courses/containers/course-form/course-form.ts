import { FormUtils } from './../../../shared/form/form-utils';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../model/lesson';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.html',
    styleUrl: './course-form.scss',
    imports: [MatCard, MatToolbar, MatCardContent, ReactiveFormsModule, MatFormField, MatInput, MatError, MatLabel, MatSelect, MatOption, MatIconButton, MatIcon, MatCardActions, MatButton]
})
export class CourseForm implements OnInit {

  form!: FormGroup;

  constructor(

    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public FormUtils: FormUtils
  ) { }

  ngOnInit() {
  const course: Course | undefined = this.route.snapshot.data['course'];
  if (course) {
    this.form = this.formBuilder.group({
      id: [course.id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
  } else {
    // Se não houver course, mantenha o form já inicializado no construtor
    // ou, se preferir, reforce a inicialização:
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      category: ['', [Validators.required]],
      lessons: this.formBuilder.array([this.createLesson()])
    });
  }
}

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}) {
    // Create a new lesson object
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(5), Validators.maxLength(150)]]
    });
  }

  // Getter for the lessons form array
  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  // Method to add a new lesson
  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  // Method to remove a lesson
  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  // Method to handle form submission
  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value)
        .subscribe({next: (result) => this.onSuccess(), error: () => { this.onError() }});
    } else {
      this.FormUtils.validateAllFormFields(this.form);
    }
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
}
