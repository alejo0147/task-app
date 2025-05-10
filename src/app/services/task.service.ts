import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [
    { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1' },
    { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2' },
    { id: 3, title: 'Tarea 3', description: 'Descripción de la tarea 3' },
    { id: 4, title: 'Tarea 4', description: 'Descripción de la tarea 4' },
    { id: 5, title: 'Tarea 5', description: 'Descripción de la tarea 5' }
  ];

  private url: string = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Task[]> {
    return of(this.tasks);
    // return this.http.get<Task[]>(this.url);
  }

}
