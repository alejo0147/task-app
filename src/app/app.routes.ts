import { Routes } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskComponent } from './components/task/task.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/create',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/edit/:id',
    component: TaskFormComponent,
    canActivate: [AuthGuard]

  }
];