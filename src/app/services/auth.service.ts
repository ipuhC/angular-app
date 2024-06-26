import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Ajusta la URL base según tu configuración
  private currentUser!: user;
  constructor(private http: HttpClient) { }


  
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userRole', response.role);
            localStorage.setItem('userName', response.name);
            localStorage.setItem('userId', response.userId);
          }
        })
      );
  }
  register(name: string, email: string, password: string, passwordConfirmation: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password, password_confirmation: passwordConfirmation })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        })
      );
  }
  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }
  getCurrentUser(): any {
    // Devuelve la información del usuario actual
    return this.currentUser;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
