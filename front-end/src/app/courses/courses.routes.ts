import { Routes } from "@angular/router";
import { CourseForm } from "./containers/course-form/course-form";
import { Courses } from "./containers/courses/courses";
import { CourseResolver } from "./guards/course-resolver";

export const COURSES_ROUTES: Routes = [
  { path: '', component: Courses },
  { path: 'new', component: CourseForm, resolve: { course: CourseResolver } },
  { path: 'edit/:id', component: CourseForm, resolve: { course: CourseResolver } }
];
