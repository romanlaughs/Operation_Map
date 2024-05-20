import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './models/user.model';
import { Project } from './models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Method to get user data by email
  getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}/users/email/${email}`;
    return this.http.get<User>(url);
  }

  // Method to check if user info is complete
  isUserInfoComplete(email: string): Observable<{ isComplete: boolean }> {
    return this.http.get<{ isComplete: boolean }>(`${this.apiUrl}/users/info-complete/${email}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          // Handle 404 error and return { isComplete: false }
          return of({ isComplete: false });
        } else {
          // Rethrow other errors
          throw error;
        }
      })
    );
  }

  // Method to create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      catchError(this.handleError)
    );
  }

  // Method to update a user by email
  updateUser(email: string, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/email/${email}`, user).pipe(
      catchError(this.handleError)
    );
  }

  // Method to delete a user by email
  deleteUser(email: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/email/${email}`).pipe(
      catchError(this.handleError)
    );
  }

  // Generic handler for 404 errors
  private handle404<T>(result: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status === 404) {
        console.error('Not Found: ', error.message);
        return of(result);
      }
      return throwError(error);
    };
  }

  // Generic error handler for other errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(error);
  }

  // Method to get all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      catchError(this.handleError)
    );
  }

  // Method to get a project by ID
  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Method to create a new project
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project).pipe(
      catchError(this.handleError)
    );
  }

  // Method to update a project by ID
  updateProject(id: string, project: Project): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/projects/${id}`, project).pipe(
      catchError(this.handleError)
    );
  }

  // Method to delete a project by ID
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
