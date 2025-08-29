import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { ErrorDialog } from '../../../shared/components/error-dialog/error-dialog';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ConfirmationDialog } from '../../../shared/components/confirmation-dialog/confirmation-dialog';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.html',
  styleUrl: './courses.scss'
})

export class Courses implements OnInit {

  courses$: Observable<CoursePage> | null = null;

  // Reference to the paginator component
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  pageIndex = 10;
  pageSize = 0;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.courses$ = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(page => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        this.onError('Erro ao carregar cursos. Entre em contato com o administrador.');
        return of({ courses: [], totalElements: 0, totalPages: 0 }); // Return an empty array in case of error
      })
    );
  }

  // Method to open the error dialog
  onError(errorMsg: string) {
      this.dialog.open(ErrorDialog, {
        data: errorMsg,
      });
    }

  ngOnInit() {

  }

  // Navigate to the 'new' route relative to the current route
  // This will allow the user to add a new course
  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // Navigate to the 'edit' route with the course ID
  // This will allow the user to edit the selected course
  onEdit(course: Course) {
    this.router.navigate(['edit', course.id], { relativeTo: this.route });
  }

  // Method to handle removing a course
  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }
}
