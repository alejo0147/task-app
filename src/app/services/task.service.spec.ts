import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

import { TaskService } from './task.service';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/tasks';

  const mockTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1' },
    { id: 2, title: 'Task 2', description: 'Description 2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);

    // Establecer el token esperado en sessionStorage
    sessionStorage.setItem('auth_token', 'VALIDO-TOKEN');
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear(); // Limpia el token después de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all tasks on findAll()', () => {
    service.findAll().subscribe(tasks => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer VALIDO-TOKEN');
    req.flush(mockTasks);
  });

  it('should return a task by id on findById()', () => {
    const taskId = 1;

    service.findById(taskId).subscribe(task => {
      expect(task).toEqual(mockTasks[0]);
    });

    const req = httpMock.expectOne(`${apiUrl}/${taskId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer VALIDO-TOKEN');
    req.flush(mockTasks[0]);
  });

  it('should create a new task on create()', () => {
    const newTask: Task = { id: 0, title: 'New Task', description: 'New Description' };
    const createdTask: Task = { ...newTask, id: 3 };

    service.create(newTask).subscribe(task => {
      expect(task).toEqual(createdTask);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer VALIDO-TOKEN');
    expect(req.request.body).toEqual(newTask);
    req.flush(createdTask);
  });

  it('should update a task on update()', () => {
    const taskToUpdate: Task = { id: 1, title: 'Updated Task', description: 'Updated Description' };

    service.update(taskToUpdate).subscribe(task => {
      expect(task).toEqual(taskToUpdate);
    });

    const req = httpMock.expectOne(`${apiUrl}/${taskToUpdate.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('Bearer VALIDO-TOKEN');
    expect(req.request.body).toEqual(taskToUpdate);
    req.flush(taskToUpdate);
  });

  it('should delete a task on delete()', () => {
    const taskId = 1;

    service.delete(taskId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe('Bearer VALIDO-TOKEN');
    req.flush(null);
  });
});
