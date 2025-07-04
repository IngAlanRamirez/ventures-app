import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export const corsInterceptor: HttpInterceptorFn = (req, next) => {
  // Añadir headers para CORS si es necesario
  const corsRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Cache-Control': 'no-cache'
    }
  });

  return next(corsRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    })
  );
};
