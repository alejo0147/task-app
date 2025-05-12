import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthServiceService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthServiceService', ['isLoggedIn']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthServiceService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation if user is logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);

    expect(guard.canActivate()).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should block activation and redirect to /login if user is not logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(false);

    expect(guard.canActivate()).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
