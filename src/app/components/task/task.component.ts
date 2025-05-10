import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input() tasks: Task[] = [];
  @Output() idTaskEventEmitter = new EventEmitter<number>();
  @Output() taskEventEmitter = new EventEmitter<Task>();

  deleteTask(id: number): void {

    const taskToDelete = this.tasks.find(task => task.id === id);

    const taskTitle = taskToDelete?.title || 'esta tarea';

    Swal.fire({
      title: `Seguro que quieres eliminar la tarea ${taskTitle} ?`,
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.idTaskEventEmitter.emit(id);
        console.log('Tarea eliminada:', id);
        Swal.fire({
          title: "Eliminado!",
          text: "La tarea fue eliminada correctamente",
          icon: "success"
        });
      }
    });
  }

  editTask(task: Task): void {
    this.taskEventEmitter.emit(task);
    console.log('Tarea editada:', task);
  }

}
