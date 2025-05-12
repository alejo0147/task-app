import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:8080/api/tasks";

  private getHttpOptions() {
    const token = sessionStorage.getItem('auth_token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  constructor(private http: HttpClient) { }

  findAll(): Observable<Task[]> {
    // return of(this.tasks);
    return this.http.get<Task[]>(this.apiUrl, this.getHttpOptions());
  }

  findById(id: number): Observable<Task> {
    // return of(this.tasks.find(task => task.id === id));
    return this.http.get<Task>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  } 

  create(task: Task): Observable<Task> {
    // this.tasks.push(task);
    // return of(task);
    return this.http.post<Task>(this.apiUrl, task, this.getHttpOptions());
  }

  update(task: Task): Observable<Task> {
    // this.tasks = this.tasks.map(t => (t.id === task.id) ? { ...task } : t);
    // return of(task);
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, this.getHttpOptions());
  }

  delete(id: number): Observable<void> {
    // this.tasks = this.tasks.filter(task => task.id !== id);
    // return of();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

}
