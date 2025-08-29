import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CategoryPipe } from '../../../shared/pipes/category-pipe';


@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.html',
    styleUrl: './courses-list.scss',
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIcon, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, CategoryPipe]
})
export class CoursesList {

  @Input()  courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() {}

  // Method to navigate to the course details
  onAdd() {
    this.add.emit(true);
  }

  // Method to handle editing a course
  onEdit(course: Course) {
    this.edit.emit(course);
  }

  // Method to handle removing a course
  onDelete(course: Course) {
    this.remove.emit(course);
  }

}
