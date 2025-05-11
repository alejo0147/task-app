import { TestBed } from '@angular/core/testing';
import { AuthServiceService } from './auth-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthServiceService]
    });

    service = TestBed.inject(AuthServiceService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
  });

  afterEach(() => {
    // Verificar que no hay solicitudes HTTP pendientes
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login()', () => {
    it('should make a POST request to login endpoint', () => {
      const mockUsername = 'testuser';
      const mockPassword = 'testpass';
      const mockToken = 'mock-token-123';

      service.login(mockUsername, mockPassword).subscribe();

      const req = httpMock.expectOne(`${service['apiUrl']}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username: mockUsername, password: mockPassword });

      // Simular respuesta exitosa con token
      req.flush({}, {
        headers: { 'Authorization': mockToken },
        status: 200,
        statusText: 'OK'
      });
    });

    it('should save token when login is successful', () => {
      const mockToken = 'mock-token-123';
      const saveTokenSpy = spyOn(service as any, 'saveToken').and.callThrough();

      service.login('test', 'test').subscribe(() => {
        expect(saveTokenSpy).toHaveBeenCalledWith(mockToken);
        expect(service.getToken()).toBe(mockToken);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/login`);
      req.flush({}, {
        headers: { 'Authorization': mockToken },
        status: 200,
        statusText: 'OK'
      });
    });

    it('should not save token when login fails', () => {
      const saveTokenSpy = spyOn(service as any, 'saveToken');

      service.login('test', 'test').subscribe({
        error: () => {
          expect(saveTokenSpy).not.toHaveBeenCalled();
          expect(service.getToken()).toBeNull();
        }
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/login`);
      req.flush(null, {
        status: 401,
        statusText: 'Unauthorized'
      });
    });
  });

  describe('saveToken()', () => {
    it('should store token in localStorage', () => {
      const mockToken = 'test-token-123';
      
      (service as any).saveToken(mockToken);
      
      expect(localStorage.getItem('auth_token')).toBe(mockToken);
    });
  });

  describe('getToken()', () => {
    it('should return null when no token is stored', () => {
      expect(service.getToken()).toBeNull();
    });

    it('should return token when it exists in localStorage', () => {
      const mockToken = 'test-token-123';
      localStorage.setItem('auth_token', mockToken);
      
      expect(service.getToken()).toBe(mockToken);
    });
  });

  describe('isLoggedIn()', () => {
    it('should return false when no token is present', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('should return true when token is present', () => {
      localStorage.setItem('auth_token', 'test-token');
      expect(service.isLoggedIn()).toBeTrue();
    });
  });

  describe('logout()', () => {
    it('should remove token from localStorage and navigate to login', () => {
      const navigateSpy = spyOn(router, 'navigate');
      localStorage.setItem('auth_token', 'test-token');
      
      service.logout();
      
      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });

    it('should navigate to login even if no token was stored', () => {
      const navigateSpy = spyOn(router, 'navigate');
      
      service.logout();
      
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });
});