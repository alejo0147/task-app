import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Task } from '../../models/task';
import { AuthServiceService } from '@app/services/auth-service.service';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() tasks: Task[] = [];

  constructor(private authService: AuthServiceService, private router: Router) { }

  logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}

}
