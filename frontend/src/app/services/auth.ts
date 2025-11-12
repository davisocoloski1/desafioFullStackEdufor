import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient)
  
  isLogged = signal<boolean>(false);
  
  constructor() {
    const token = localStorage.getItem('token')
    this.isLogged.set(!!token)
  }

  logout(url: string) {
    return this.http.delete(url)
  }
}
