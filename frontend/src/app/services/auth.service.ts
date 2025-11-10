import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginDTO { email: string; password: string }
export interface RegisterDTO { username: string; email: string; password: string }
export interface User { id: number; username: string; email: string }
export interface AuthResponse { token: string; user: User }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.apiUrl

  constructor(private http: HttpClient) {}

  login(data: LoginDTO): Observable<User> {
    return this.http.post<AuthResponse>(`${this.api}/login`, data).pipe(
      tap(res => localStorage.setItem('token', res.token)),
      map(res => res.user)
    )
  }

  register(data: RegisterDTO): Observable<User> {
    return this.http.post<AuthResponse>(`${this.api}/registro`, data).pipe(
      tap(res => localStorage.setItem('token', res.token)),
      map(res => res.user)
    )
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.api}/me`)
  }

  logout(): void {
    localStorage.removeItem('token')
  }

  get token(): string | null {
    return localStorage.getItem('token')
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
}
