import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router)
  const token = localStorage.getItem('token')

  if (!token) {
    router.navigate(["/users/login"], { state: { msg: "Faça login para utilizar nossos serviços!" }})
    return false
  }
  
  return true
};
