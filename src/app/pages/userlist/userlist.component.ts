import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/persona.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminLayoutComponent } from '../../shared/admin-layout/admin-layout.component';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, RouterLink, AdminLayoutComponent],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit{
  personas: Persona[] = [];
  currentPersona: Persona = {
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    telefono: '',
    direccion: '',
    estado: '',
    ciudad: ''
  };;
  persona: Persona = {
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    telefono: '',
    direccion: '',
    estado: '',
    ciudad: ''
  }; // Initialize 'persona' property
  
  constructor(
    private personaService: PersonaService, private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  private loadData(): void {
    this.personaService.getPersonas().subscribe(personas => {
      this.personas = personas;
    });
  }

  deletePersona(id: number): void {
    this.personaService.deletePersona(id).subscribe(response => {
      this.personas = this.personas.filter(persona => persona.id != id);
    });
  }

  editPersona(id: number) {
    this.personaService.getPersona(id).subscribe(persona => {
      this.currentPersona  = persona;  // Asignar los datos recibidos a una propiedad del componente
    console.log('Datos de la persona recibidos:', this.currentPersona);
    });
  }

}
