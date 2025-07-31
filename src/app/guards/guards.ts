import { inject } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";




export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router)

  if (!token) {
    router.navigateByUrl('/login')
    return false;
  }
  return true
}

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated() || !authService.hasRole('admin')) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};

