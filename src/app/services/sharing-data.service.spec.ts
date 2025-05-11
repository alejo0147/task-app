import { TestBed } from '@angular/core/testing';
import { SharingDataService } from './sharing-data.service';
import { Task } from '../models/task';

describe('SharingDataService', () => {
  let service: SharingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have EventEmitter for newTask', () => {
    expect(service.newTaskEventEmitter).toBeDefined();
  });

  it('should have EventEmitter for idTask', () => {
    expect(service.idTaskEventEmitter).toBeDefined();
  });

  it('should have EventEmitter for findTaskById', () => {
    expect(service.findTaskByIdEventEmitter).toBeDefined();
  });

  it('should have EventEmitter for selectTask', () => {
    expect(service.selectTaskEventEmitter).toBeDefined();
  });

  it('should emit task on newTaskEventEmitter', (done) => {
    const mockTask: Task = { id: 1, title: 'Test Task', description: 'Test Description' };
    
    service.newTaskEventEmitter.subscribe((task: Task) => {
      expect(task).toEqual(mockTask);
      done();
    });
    
    service.newTaskEventEmitter.emit(mockTask);
  });

  it('should emit id on idTaskEventEmitter', (done) => {
    const taskId = 1;
    
    service.idTaskEventEmitter.subscribe((id: number) => {
      expect(id).toEqual(taskId);
      done();
    });
    
    service.idTaskEventEmitter.emit(taskId);
  });

  it('should emit id on findTaskByIdEventEmitter', (done) => {
    const taskId = 1;
    
    service.findTaskByIdEventEmitter.subscribe((id: number) => {
      expect(id).toEqual(taskId);
      done();
    });
    
    service.findTaskByIdEventEmitter.emit(taskId);
  });

  it('should emit task on selectTaskEventEmitter', (done) => {
    const mockTask: Task = { id: 1, title: 'Test Task', description: 'Test Description' };
    
    service.selectTaskEventEmitter.subscribe((task: Task) => {
      expect(task).toEqual(mockTask);
      done();
    });
    
    service.selectTaskEventEmitter.emit(mockTask);
  });
});