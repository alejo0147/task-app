import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Task } from '../../models/task';

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

}
