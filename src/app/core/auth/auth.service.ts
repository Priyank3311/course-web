import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../services/base.service';
import { LoginRequestDto, AuthResponseDto, RegisterRequestDto } from '../../models/auth.model';
import { ResponseModel } from '../../models/response.model';
import { map, Observable, tap, throwError } from 'rxjs';

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
  register(dto: RegisterRequestDto): Observable<ResponseModel<any>> {
    return this.add<RegisterRequestDto, ResponseModel<any>>('/auth/register', dto);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');

  }
  setRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
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

  private _justLoggedIn = false;

  setJustLoggedIn(value: boolean) {
    this._justLoggedIn = value;
  }

  getJustLoggedIn(): boolean {
    return this._justLoggedIn;
  }
  getLoggedInUsername(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '';
  }

  refreshAccessToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    console.log("response of refress", refreshToken);
    if (!refreshToken) return throwError(() => 'Refresh token missing');

    return this.add<{ refreshToken: string }, ResponseModel<string>>('/Auth/refresh', { refreshToken })
      .pipe(
        tap(res => {
          console.log("res", res);
          this.setToken(res.data);
        }),
        map(res => res.data)
      );
  }
}
