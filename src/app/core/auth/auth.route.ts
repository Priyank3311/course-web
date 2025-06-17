import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { LoginGuard } from '../guards/login.guard';
import { Register } from './register/register';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component : Register,
    canActivate: [LoginGuard]
  }
];
