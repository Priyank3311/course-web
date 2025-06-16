import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { MainLayoutComponent } from '../../shared/layouts/main-layout/main-layout';
import { CourseForm } from './course-form/course-form';

export const adminRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'add-course',
        component: CourseForm
      },
      { path: 'edit/:id',
        component: CourseForm
      }
    ]
  }
];
