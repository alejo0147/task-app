import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskAppComponent } from './components/task-app/task-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TaskAppComponent,
    // RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasks-app';
}
