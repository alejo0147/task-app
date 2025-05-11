import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from './services/task.service';
import { SharingDataService } from './services/sharing-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  
  const mockTaskService = {
    findAll: jasmine.createSpy('findAll').and.returnValue(of([]))
  };

  const mockSharingDataService = {
    newTaskEventEmitter: of({ id: 1, title: 'Test Task' }),
    idTaskEventEmitter: of(1),
    findTaskByIdEventEmitter: of(1),
    selectTaskEventEmitter: { emit: jasmine.createSpy('emit') }
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,         
        HttpClientTestingModule, 
        RouterTestingModule    
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: SharingDataService, useValue: mockSharingDataService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

 
  it('should contain task-app component', () => {
    const taskAppElement = fixture.nativeElement.querySelector('task-app');
    expect(taskAppElement).toBeTruthy();
  });
});