import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../shared/layouts/main-layout/main-layout';
import { AvailableCourses } from './available-courses/available-courses';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses';
import { Profile } from './profile/profile';

export const studentRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: AvailableCourses }, // default page
      { path: 'courses', component: AvailableCourses },
      { path: 'my-courses', component: EnrolledCoursesComponent },
      { path: 'profile', component: Profile }
    ]
  }
];
