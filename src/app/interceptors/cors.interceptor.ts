import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export const corsInterceptor: HttpInterceptorFn = (req, next) => {
  // Log de requests para debugging en GitHub Pages
  console.log('🌍 API Request:', {
    url: req.url,
    method: req.method,
    headers: req.headers.keys().map(key => ({ [key]: req.headers.get(key) })),
    environment: environment.SERVER_URL,
    production: environment.production
  });

  // Añadir headers para CORS si es necesario
  const corsRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Cache-Control': 'no-cache'
    }
  });

  return next(corsRequest).pipe(
    tap(response => {
      console.log('✅ API Response Success:', {
        url: req.url,
        status: response.type,
        body: response
      });
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('❌ API Error:', {
        url: req.url,
        status: error.status,
        statusText: error.statusText,
        message: error.message,
        error: error.error,
        type: error.type,
        isCORS: error.status === 0 || error.status === null
      });

      // Detectar errores de CORS
      if (error.status === 0) {
        console.error('🚫 CORS Error detected - The API server might not allow requests from GitHub Pages');
        console.error('📝 Possible solutions:');
        console.error('   1. Configure CORS on the API server');
        console.error('   2. Use a proxy server');
        console.error('   3. Implement mock data for GitHub Pages');
      }

      return throwError(() => error);
    })
  );
};
