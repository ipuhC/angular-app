import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService =  inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getRole();

  if (isAuthenticated && (!expectedRole || userRole === expectedRole)) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
  
};
