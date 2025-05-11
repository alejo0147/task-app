import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { ActivatedRoute } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { of } from 'rxjs';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  const mockActivatedRoute = {
    paramMap: of({ get: () => '1' })
  };

  const mockSharingData = {
    selectTaskEventEmitter: of({ id: 1, title: 'Test', description: 'Test task' }),
    findTaskByIdEventEmitter: { emit: jasmine.createSpy('emit') },
    newTaskEventEmitter: { emit: jasmine.createSpy('emit') }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SharingDataService, useValue: mockSharingData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TaskFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit task on submit', () => {
    component.task.title = 'Sample Task';
    const mockForm = {
      valid: true,
      reset: jasmine.createSpy('reset'),
      resetForm: jasmine.createSpy('resetForm')
    } as any;
    component.onSubmit(mockForm);
    expect(mockSharingData.newTaskEventEmitter.emit).toHaveBeenCalled();
  });

  it('should clear the form', () => {
    component.task.title = 'Old Title';

    const mockForm = {
      reset: jasmine.createSpy('reset'),
      resetForm: jasmine.createSpy('resetForm')
    } as any;

    component.clearForm(mockForm);

    expect(component.task).toEqual(jasmine.any(Object));
    expect(component.task.title).toBeUndefined(); 
    expect(mockForm.reset).toHaveBeenCalled();
    expect(mockForm.resetForm).toHaveBeenCalled();
  });


});
