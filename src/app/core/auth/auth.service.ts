import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../services/base.service';
import { LoginRequestDto, AuthResponseDto } from '../../models/auth.model';
import { ResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(dto: LoginRequestDto) {
    return this.add<LoginRequestDto, ResponseModel<AuthResponseDto>>('/auth/login', dto);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp && exp > now;
    } catch (e) {
      return false;
    }
  }

  getRole(): string {
    const token = this.getToken();
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        || payload['role']
        || '';
    } catch {
      return '';
    }
  }
}
