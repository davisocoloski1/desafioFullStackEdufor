import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router)
  const token = localStorage.getItem('token')

  if (token) {
    return true;
  }
  
  router.navigate(["/users/login"])
  return false;
};
