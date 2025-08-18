import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Courses } from './containers/courses/courses';
import { CourseForm } from './containers/course-form/course-form';
import { CourseResolver } from './guards/course-resolver';

const routes: Routes = [
  { path: '', component: Courses },
  { path: 'new', component: CourseForm },
  { path: 'edit/:id', component: CourseForm, resolve: { course: CourseResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
