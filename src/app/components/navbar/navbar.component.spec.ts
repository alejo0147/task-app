import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthServiceService } from '@app/services/auth-service.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockAuthService: jasmine.SpyObj<AuthServiceService>;

  beforeEach(async () => {
    // Creamos un mock del AuthServiceService
    mockAuthService = jasmine.createSpyObj('AuthServiceService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NavbarComponent
      ],
      providers: [
        { provide: AuthServiceService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.logout when logout() is called', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
