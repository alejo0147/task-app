import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { TaskComponent } from '../task/task.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'task-app',
  standalone: true,
  imports: [
    TaskComponent,
    TaskFormComponent
  ],
  templateUrl: './task-app.component.html',
  styleUrl: './task-app.component.css'
})
export class TaskAppComponent implements OnInit {

  title: string = 'Lista de Tareas!';
  titleForm: string = 'Formulario de Tareas';
  tasks: Task[] = [];
  taskSelected: Task = new Task();
  showForm: boolean = false;

  constructor(private service: TaskService) {

  }

  ngOnInit() {
    this.service.findAll().subscribe(tasks => this.tasks = tasks);
  }

  addTask(task: Task): void {
    if (task.id > 0) {
      this.tasks = this.tasks.map(t => (t.id === task.id) ? { ...task } : t);
    } else {
      this.tasks = [...this.tasks, { ...task, id: this.tasks.length + 1 }];
    }
    this.taskSelected = new Task();
    this.setOpenForm();
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  editTask(taskRow: Task): void {
    this.taskSelected = { ...taskRow };
    this.showForm = true;
  }

  setOpenForm(): void {
    this.showForm = !this.showForm;
  }

}
