import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'task-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  @Input() task: Task;
  @Output() newTaskEventEmitter = new EventEmitter<Task>();

  constructor() {
    this.task = new Task();
  }

  onSubmit(taskForm: NgForm): void {
    if (taskForm.valid) {
      this.newTaskEventEmitter.emit(this.task);
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
