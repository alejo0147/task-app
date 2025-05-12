import { TestBed } from '@angular/core/testing';
import { AuthServiceService } from './auth-service.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthServiceService]
    });

    service = TestBed.inject(AuthServiceService);
    router = TestBed.inject(Router);

    // Limpiar sessionStorage antes de cada prueba
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login()', () => {
    it('should return true for correct credentials', () => {
      const result = service.login('admin', '1234');
      expect(result).toBeTrue();
      expect(service.isLoggedIn()).toBeTrue();
      expect(service.getUsername()).toBe('admin');
    });

    it('should return false for incorrect credentials', () => {
      const result = service.login('wrong', 'credentials');
      expect(result).toBeFalse();
      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  describe('getToken()', () => {
    it('should return null if no token is stored', () => {
      expect(service.getToken()).toBeNull();
    });

    it('should return a token after successful login', () => {
      service.login('admin', '1234');
      const token = service.getToken();
      expect(token).toContain('VALIDO-TOKEN-');
    });
  });

  describe('getUsername()', () => {
    it('should return the username after login', () => {
      service.login('admin', '1234');
      expect(service.getUsername()).toBe('admin');
    });

    it('should return null if not logged in', () => {
      expect(service.getUsername()).toBeNull();
    });
  });

  describe('logout()', () => {
    it('should clear session storage and navigate to /login', () => {
      const navigateSpy = spyOn(router, 'navigate');
      service.login('admin', '1234');

      service.logout();

      expect(service.getToken()).toBeNull();
      expect(service.getUsername()).toBeNull();
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('isLoggedIn()', () => {
    it('should return false when not logged in', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('should return true after successful login', () => {
      service.login('admin', '1234');
      expect(service.isLoggedIn()).toBeTrue();
    });
  });
});
