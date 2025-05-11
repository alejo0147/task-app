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
    this.findTaskById();
  }

  addTask(): void {
    this.sharingData.newTaskEventEmitter.subscribe((task: Task) => {
      if (task.id > 0) {
        // this.service.update(task).subscribe(taskUpdated => { {...taskUpdated} ↓
          this.tasks = this.tasks.map(t => (t.id === task.id) ? { ...task } : t);

          this.router.navigate(['/tasks'], { state: { tasks: this.tasks } });
        // });
      } else {
        this.service.create(task).subscribe(taskNew => {
          // this.tasks = [...this.tasks, { ...task, id: this.tasks.length + 1 }]; 
          this.tasks = [...this.tasks, { ...taskNew }]; 

          this.router.navigate(['/tasks'], { state: { tasks: this.tasks } });
        });
      }
      
      // this.router.navigate(['/tasks']);
    });
  }

  removeTask(): void {
    this.sharingData.idTaskEventEmitter.subscribe((id: number) => {
      this.service.delete(id).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.router.navigate(['/tasks/create'], { skipLocationChange: true }).then(() => {
          this.router.navigate(['/tasks'], { state: { tasks: this.tasks } });
        });
      });
    });
  }

  findTaskById() {
    this.sharingData.findTaskByIdEventEmitter.subscribe(id => {
      const task = this.tasks.find(task => task.id === id);
      this.sharingData.selectTaskEventEmitter.emit(task);
    });
  }

}
