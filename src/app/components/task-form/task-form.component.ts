import { Component, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { TaskService } from '../../services/task.service';


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
export class TaskFormComponent implements OnInit {

  task: Task;

  constructor(
    private route: ActivatedRoute,
    private sharingData: SharingDataService,
    private service: TaskService,
  ) {
    this.task = new Task();
  }

  ngOnInit(): void {
    this.sharingData.selectTaskEventEmitter.subscribe(task => this.task = task);

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
         this.sharingData.findTaskByIdEventEmitter.emit(id);
        // this.service.findById(id).subscribe(task => {
        //   this.task = task;
        //   console.log('Tarea encontrada:', task);
        // });
      }
    });
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
