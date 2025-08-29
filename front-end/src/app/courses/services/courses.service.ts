import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs/operators';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  // URL to the JSON file containing course data
  // private readonly API = '/assets/courses.json';
  private readonly API = 'api/courses';

  // Injecting HttpClient to make HTTP requests
  constructor(private httpClient: HttpClient) {}

  //Observable
  list(page = 0, pageSize = 10) {
    // O backend retorna um objeto paginado, não um array
    return this.httpClient.get<CoursePage>(this.API, {params: {page, pageSize}})
    .pipe(
      first(),
      delay(1000),
      tap(page => console.log(page))
    );
  }

  // Method to load a course by ID
  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`).pipe(first());
  }

  // Method to save a course
  save(record : Partial<Course>) {
    if (record.id) {
      // If the record has an ID, update the existing course
      return this.update(record);
    }
    return this.create(record);
  }

  // Method to create a new course
  private create(record : Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
    }

  // Method to update an existing course
  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record.id}`, record).pipe(first());
  }

  // Method to remove a course
  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}
