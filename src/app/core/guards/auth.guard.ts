import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const userRole = authService.getRole().toLowerCase();
  const url = state.url.toLowerCase();


  if (!isLoggedIn) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (url.startsWith('/admin') && userRole !== 'admin') {
    router.navigate(['/auth/login']);
    return false;
  }

  if (url.startsWith('/student') && userRole !== 'student') {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
