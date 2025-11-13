import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient)
  url = environment.apiUrl
  
  isLogged = signal<boolean>(false);
  
  constructor() {
    const token = localStorage.getItem('token')
    this.isLogged.set(!!token)
  }

  registrar(email: string, password: string, username: string) {
    return this.http.post(`${this.url}/usuarios/registros`, { username, email, password })
  }

  login(email: string, password: string) {
    return this.http.post(`${this.url}/usuarios/login`, { email, password })
  }

  logout(url: string) {
    return this.http.delete(url)
  }
}
