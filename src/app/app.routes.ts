import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { Dashboard } from './modules/admin/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.route').then(m => m.authRoutes)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: 'student',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/student/student.routes').then(m => m.studentRoutes)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
