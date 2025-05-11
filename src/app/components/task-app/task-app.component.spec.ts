import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskAppComponent } from './task-app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../services/task.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { of, Subject } from 'rxjs';

describe('TaskAppComponent', () => {
  let component: TaskAppComponent;
  let fixture: ComponentFixture<TaskAppComponent>;

  const mockTaskService = {
    findAll: () => of([]),
    create: (task: any) => of(task),
    delete: (id: number) => of(true)
  };

  const mockSharingData = {
    newTaskEventEmitter: new Subject(),
    idTaskEventEmitter: new Subject(),
    findTaskByIdEventEmitter: new Subject(),
    selectTaskEventEmitter: { emit: jasmine.createSpy('emit') }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TaskAppComponent],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: SharingDataService, useValue: mockSharingData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TaskAppComponent', () => {
    expect(component).toBeTruthy();
  });
});
