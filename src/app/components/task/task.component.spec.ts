import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  const mockRouter = {
    getCurrentNavigation: () => ({
      extras: { state: { tasks: [{ id: 1, title: 'Test Task', description: 'prueba' }] } }
    }),
    navigate: jasmine.createSpy('navigate')
  };

  const mockService = {
    findAll: jasmine.createSpy('findAll').and.returnValue(of([{ id: 2, title: 'New Task', description: 'prueba 2' }]))
  };

  const mockSharingData = {
    idTaskEventEmitter: { emit: jasmine.createSpy('emit') }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: TaskService, useValue: mockService },
        { provide: SharingDataService, useValue: mockSharingData },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TaskComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit id to delete task', async () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true, isDenied: false, isDismissed: false }));

    await component.deleteTask(1);

    expect(mockSharingData.idTaskEventEmitter.emit).toHaveBeenCalledWith(1);
  });

  it('should not call findAll when tasks are already provided', () => {
    component.tasks = [{ id: 1, title: 'Test Task', description: 'prueba' }];

    mockService.findAll.calls.reset(); // Limpiamos llamadas anteriores

    component.ngOnInit();

    expect(mockService.findAll).not.toHaveBeenCalled();
  });

  it('should call findAll and set tasks when tasks are undefined', () => {
    component.tasks = [];

    component.ngOnInit();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('New Task');
  });

  it('should call findAll and set tasks when tasks is empty array', () => {
    component.tasks = [];

    component.ngOnInit();

    expect(mockService.findAll).toHaveBeenCalled();
    expect(component.tasks.length).toBe(1);
  });

});
