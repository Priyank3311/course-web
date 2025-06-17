import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  const refreshToken = auth.getRefreshToken();

  // If no token but refresh exists → try to refresh early
  if (!token && refreshToken) {
    console.log('No token found, attempting to refresh...');
    return auth.refreshAccessToken().pipe(
      switchMap((newToken) => {
        const retryReq = req.clone({
          setHeaders: { Authorization: `Bearer ${newToken}` }
        });
        return next(retryReq);
      }),
      catchError(err => {
        auth.logout();
        return throwError(() => err);
      })
    );
  }

  // If token exists → attach it
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // ✅ Handle expired token with 401
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 && refreshToken) {
        return auth.refreshAccessToken().pipe(
          switchMap((newToken) => {
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });
            return next(retryReq);
          }),
          catchError(refreshErr => {
            auth.logout();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => error);
    })
  );
};