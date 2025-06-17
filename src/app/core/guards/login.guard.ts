import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      const role = this.auth.getRole().toLowerCase();
      this.router.navigate([role === 'admin' ? '/admin/dashboard' : '/student/dashboard']);
      return false;
    }

    return true;
  }
}
