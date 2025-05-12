import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const token = authService.getToken();

  // Permitir solicitudes a la ruta raíz sin token
  if (req.url === '/') {
    return next(req);
  }

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  // Redirigir al login si no hay token
  router.navigate(['/login']);
  throw new Error('Acceso no autorizado');
};