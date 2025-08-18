import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../shared/app-material/app-material-module';
import { SharedModule } from '../shared/shared-module';
import { CoursesRoutingModule } from './courses-routing-module';
import { Courses } from './containers/courses/courses';
import { CourseForm } from './containers/course-form/course-form';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesList } from './components/courses-list/courses-list';


@NgModule({
  declarations: [
    Courses,
    CourseForm,
    CoursesList
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
