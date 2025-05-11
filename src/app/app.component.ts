import { Component } from '@angular/core';
import { TaskAppComponent } from './components/task-app/task-app.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TaskAppComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
