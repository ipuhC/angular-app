import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { user } from '../models/user.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Ajusta la URL base según tu configuración
  private api_url = 'http://localhost:8000/api/users'; // Ajusta la URL base según tu configuración
  private currentUser!: user;
  private readonly BASE_URL = 'http://127.0.0.1:8000/storage/'; // URL base para las fotos de perfil


  constructor(private http: HttpClient) { }
  
  getUserProfilePhoto(userId: number): Observable<string> {
    return this.http.get<{ profile_photo: string }>(`${this.api_url}/${userId}/profile-photo`).pipe(
      map(response => this.BASE_URL + response.profile_photo)
    );
  }

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

  register(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, formData)
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        })
      );
  }

  updateProfile(userId: string, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-profile/${userId}`, formData).pipe(
      tap(response => {
        if (response.success) {
          this.updateLocalStorage(response.user);
        }
      })
    );
  }


  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}/details`);
  }

  updateLocalStorage(user: any): void {
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
    if (user.profile_photo) {
      localStorage.setItem('userProfilePhoto', user.profile_photo);
    }
  }
  
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
