import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();
  const refreshToken = auth.getRefreshToken();

  const isRefreshRequest = req.url.toLowerCase().includes('/auth/refresh');

  // Skip processing for refresh token request itself
  // if (isRefreshRequest) {
  //   return next(req);
  // }


  // If no token and we have refreshToken → refresh access token
  // if (!token && refreshToken) {
  //   return auth.refreshAccessToken().pipe(
  //     switchMap((newToken) => {
  //       const retryReq = req.clone({
  //         setHeaders: { Authorization: `Bearer ${newToken}` }
  //       });
  //       return next(retryReq);
  //     }),
  //     catchError(err => {
  //       auth.logout();
  //       return throwError(() => err);
  //     })
  //   );
  // }

  // Attach token if available
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // Handle 401 by refreshing (if it's not a refresh request)
  return next(req).pipe(
    catchError((error) => {
      console.error('HTTP Error:', error);
      if (error.status == HttpStatusCode.Unauthorized && refreshToken) {
        console.log('Access token expired, refreshing...');
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
