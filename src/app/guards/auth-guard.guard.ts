import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService =  inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as Array<string>;
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getRole();

  if (isAuthenticated && (!expectedRoles || (userRole !== null && expectedRoles.includes(userRole)))) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
  
};
