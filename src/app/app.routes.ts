import { Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskComponent } from './components/task/task.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
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
