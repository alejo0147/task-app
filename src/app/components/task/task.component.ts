import { Component, EventEmitter } from '@angular/core';
import { Task } from '../../models/task';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'task',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  tasks: Task[] = [];



  constructor(
    private shraringData: SharingDataService,
    private service: TaskService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.tasks = this.router.getCurrentNavigation()?.extras.state!['tasks'];
      console.log('Tareas recibidas:', this.tasks);
    } else {
      this.service.findAll().subscribe(tasks => {
        this.tasks = tasks;
        console.log('Tareas obtenidas del servicio:', this.tasks);
      });
    }
  }

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
        this.shraringData.idTaskEventEmitter.emit(id);
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
    this.router.navigate(['/tasks/edit', task.id], {state: {task}});
    console.log('Tarea editada:', task);
  }

}
