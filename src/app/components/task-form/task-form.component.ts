import { Component, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';


@Component({
  selector: 'task-form',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  task: Task;


  constructor(
    private router: Router,
    private sharingData: SharingDataService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.task = this.router.getCurrentNavigation()?.extras.state!['task'];
      console.log('Tareas recibidas:', this.task);
    } else {
      this.task = new Task();
    }
  }

  onSubmit(taskForm: NgForm): void {
    if (taskForm.valid) {
      this.sharingData.newTaskEventEmitter.emit(this.task);
      console.log('Formulario enviado:', this.task);
      Swal.fire({
        title: "Guardado!",
        text: "La tarea fue guardada correctamente",
        icon: "success",
        draggable: true
      });
    }

    taskForm.reset();
    taskForm.resetForm();

  }

  clearForm(taskForm: NgForm): void {
    this.task = new Task();
    taskForm.reset();
    taskForm.resetForm();
  }

}
