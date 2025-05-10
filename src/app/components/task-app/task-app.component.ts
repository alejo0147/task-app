import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'task-app',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './task-app.component.html',
  styleUrl: './task-app.component.css'
})
export class TaskAppComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private router: Router,
    private sharingData: SharingDataService,
    private service: TaskService
  ) {

  }

  ngOnInit() {
    this.service.findAll().subscribe(tasks => this.tasks = tasks);
    this.addTask();
    this.removeTask();
  }

  addTask(): void {
    this.sharingData.newTaskEventEmitter.subscribe((task: Task) => {
      if (task.id > 0) {
        this.tasks = this.tasks.map(t => (t.id === task.id) ? { ...task } : t);
      } else {
        this.tasks = [...this.tasks, { ...task, id: this.tasks.length + 1 }];
      }
      this.router.navigate(['/tasks'], { state: { tasks: this.tasks } });
    });
  }

  removeTask(): void {
    this.sharingData.idTaskEventEmitter.subscribe((id: number) => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.router.navigate(['/tasks/create'], { skipLocationChange: true }).then(() => {
        this.router.navigate(['/tasks'], { state: { tasks: this.tasks } });
      });
    });
  }

}
