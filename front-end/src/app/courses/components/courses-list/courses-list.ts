import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../model/course';


@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.scss'
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
