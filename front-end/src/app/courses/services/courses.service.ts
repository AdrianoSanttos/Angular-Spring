import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs/operators';

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
  list() {
    //pipe posso manipular a informação de maneira reativa(RxJs)
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(), // Ensures that the observable completes after the first emission
      delay(1000), // Simulate a delay of 1 second
      tap(courses => console.log(courses)) // Log the courses to the console
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
