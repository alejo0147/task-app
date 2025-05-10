import { Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskComponent } from './components/task/task.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tasks',
  },
  {
    path: 'tasks',
    component: TaskComponent,
  },
  {
    path: 'tasks/create',
    component: TaskFormComponent,
  },
  {
    path: 'tasks/edit/:id',
    component: TaskFormComponent,
  }
];
