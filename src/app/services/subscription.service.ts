import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Ajusta la URL base según tu configuración

  constructor(private http: HttpClient) { }

  subscribe(userId: string, subscriberId: string): Observable<any> {
    const url = `${this.apiUrl}/subscribe/${subscriberId}`;
    const body = { userId };
    return this.http.post(url, body);
  }
  unsubscribe(userId: string, subscriberId: string): Observable<any> {
    const url = `${this.apiUrl}/unsubscribe/${userId}`;
    const body = { subscriberId };
    return this.http.post(url, body);
  }

  getSubscribers(userId: string): Observable<any> {
    const url = `${this.apiUrl}/subscribers/${userId}`;
    return this.http.get(url);
  }
}