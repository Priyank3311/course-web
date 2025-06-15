import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/services/base.service';
import { LoginRequestDto, AuthResponseDto } from 'src/app/models/auth.model';
import { ResponseModel } from 'src/app/models/response.model';
import { environment } from 'src/environments/environment';

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

  getRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.role || '';
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
