import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  //Lazy loading the courses module
  { path: 'courses',
    loadChildren: () => import('./courses/courses.routes').then(m => m.COURSES_ROUTES) }
];
