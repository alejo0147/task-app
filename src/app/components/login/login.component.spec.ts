import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthServiceService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Crear spies para los servicios
    mockAuthService = jasmine.createSpyObj('AuthServiceService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule
      ],
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
    // Configurar el spy para que devuelva un Observable exitoso
    mockAuthService.login.and.returnValue(of({ body: true } as unknown as HttpResponse<Object>));
    
    // Completar el formulario
    component.loginForm.setValue({
      username: 'testuser',
      password: 'password123'
    });
    
    // Ejecutar el método onSubmit
    component.onSubmit();
    
    // Verificar que se llamó al servicio con los valores correctos
    expect(mockAuthService.login).toHaveBeenCalledWith('testuser', 'password123');
    
    // Verificar que se navegó a la ruta correcta
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
    
    // Verificar que no hay mensaje de error
    expect(component.errorMessage).toBeNull();
  });

  it('should set error message on failed login', () => {
    // Configurar el spy para que devuelva un error
    mockAuthService.login.and.returnValue(throwError(() => new Error('Auth failed')));
    
    // Completar el formulario
    component.loginForm.setValue({
      username: 'testuser',
      password: 'wrongpassword'
    });
    
    // Ejecutar el método onSubmit
    component.onSubmit();
    
    // Verificar que se llamó al servicio con los valores correctos
    expect(mockAuthService.login).toHaveBeenCalledWith('testuser', 'wrongpassword');
    
    // Verificar que NO se navegó a ninguna ruta
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    
    // Verificar que se estableció el mensaje de error
    expect(component.errorMessage).toBe('Credenciales incorrectas');
  });

  it('should not call login service if form is invalid', () => {
    // El formulario está vacío por defecto, así que es inválido
    
    // Ejecutar el método onSubmit
    component.onSubmit();
    
    // Verificar que no se llamó al servicio
    expect(mockAuthService.login).not.toHaveBeenCalled();
    
    // Verificar que no se navegó a ninguna ruta
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});