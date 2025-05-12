import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthServiceService } from '../../services/auth-service.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthServiceService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthServiceService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthServiceService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty fields', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
    expect(component.errorMessage).toBeNull();
  });

  it('should mark form as invalid when fields are empty', () => {
    expect(component.loginForm.valid).toBeFalse();
    expect(component.loginForm.get('username')?.errors?.['required']).toBeTruthy();
    expect(component.loginForm.get('password')?.errors?.['required']).toBeTruthy();
  });

  it('should mark form as valid when all fields are filled', () => {
    component.loginForm.setValue({
      username: 'testuser',
      password: 'password123'
    });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call authService.login and navigate to /tasks on successful login', () => {
    mockAuthService.login.and.returnValue(true);

    component.loginForm.setValue({
      username: 'admin',
      password: '1234'
    });

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('admin', '1234');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
    expect(component.errorMessage).toBeNull();
  });

  it('should set error message on failed login', () => {
    mockAuthService.login.and.returnValue(false);

    component.loginForm.setValue({
      username: 'admin',
      password: 'wrongpass'
    });

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('admin', 'wrongpass');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('Credenciales incorrectas');
  });

  it('should not call login service if form is invalid', () => {
    component.loginForm.setValue({
      username: '',
      password: ''
    });

    component.onSubmit();

    expect(mockAuthService.login).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
