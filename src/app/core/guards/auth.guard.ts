import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const userRole = authService.getRole().toLowerCase();
  const url = state.url.toLowerCase();

  console.log('✅ AuthGuard checked: isLoggedIn:', isLoggedIn, 'Role:', userRole, 'URL:', url);

  if (!isLoggedIn) {
    console.log('❌ Not logged in, redirecting...');
    router.navigate(['/auth/login']);
    return false;
  }

  // Check if user is accessing their own route
  if (url.startsWith('/admin') && userRole !== 'admin') {
    console.warn('❌ Access denied: Admin route for non-admin user');
    router.navigate(['/auth/login']);
    return false;
  }

  if (url.startsWith('/student') && userRole !== 'student') {
    console.warn('❌ Access denied: Student route for non-student user');
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
