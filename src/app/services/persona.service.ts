import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private readonly API = 'http://127.0.0.1:8000/api/personas';

  constructor(private http: HttpClient) {}

  // Métodos para interactuar con la API
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.API);
  }

  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.API}/${id}`);
  }

  addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.API, persona);
  }

  updatePersona(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.API}/${id}`, persona);
  }

  deletePersona(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.API}/${id}`);
  }
}


