import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  personaForm: FormGroup;

  isFormSubmitted: boolean = false;

  estados = [
    { id: 1, nombre: 'Carabobo' },
    { id: 2, nombre: 'Aragua' },
    { id: 3, nombre: 'Zulia' },
  ];

  ciudadesPorEstado: { [key: string]: string[] } = {
    Carabobo: ['Naguanagua', 'Valencia', 'Guacara'],
    Aragua: ['Turmero', 'El Limon', 'La Victoria'],
    Zulia: ['Maracaibo', 'Cabimas', 'Ciudad Ojeda'],
  };
  personaId?: number;
  ciudades: string[] = [];

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personaForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{7,8}$'),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.pattern('^\\d{11}$'),
      ]),
      direccion: new FormControl('', [Validators.required]),
      ciudad: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
    });
    this.personaForm.get('estado')!.valueChanges.subscribe((value) => {
      if (value != null) {
        const index = Number(value); // Convierte el valor a número
        console.log('Estado seleccionado:', value);
        console.log('Ciudades para el estado:', this.ciudadesPorEstado[value]);
        this.ciudades = this.ciudadesPorEstado[value] || [];
        this.personaForm.get('ciudad')!.setValue('');
        this.personaForm.get('ciudad')!.enable();
      }
    });
  }

  ngOnInit(): void {
    this.loadDataIntoForm();
  }

  onSubmit() {
    this.isFormSubmitted = true; // Marca el formulario como enviado

    if (this.personaForm.valid) {
      console.log('pasamos el primer if')
      if (this.personaId) {
      console.log('deberia estar editando')

        console.log(this.personaForm.value); // Imprime los valores del formulario para depuración
        this.personaService
          .updatePersona(this.personaId, this.personaForm.value)
          .subscribe({
            next: (response) => {
              console.log('Persona actualizada con éxito:', response);
              this.router.navigate(['/userlist']);
              // Aquí puedes poner código para manejar la respuesta exitosa, como redirigir o mostrar un mensaje
            },
            error: (error) => {
              console.error('Error al actualizar la persona:', error);
              // Maneja errores aquí si algo va mal con la solicitud
            },
          });
      } else {

        console.log(this.personaForm.value);
        console.log('va a crear un nuevo coso') // Imprime los valores del formulario para depuración
        this.personaService.addPersona(this.personaForm.value).subscribe({
          next: (response) => {
            console.log('Persona agregada con éxito:', response);
            this.router.navigate(['/userlist']);
            // Aquí puedes poner código para manejar la respuesta exitosa, como redirigir o mostrar un mensaje
          },
          error: (error) => {
            console.error('Error al agregar la persona:', error);
            // Maneja errores aquí si algo va mal con la solicitud
          },
        });
      }
    } else {
      console.error('El formulario no es válido:', this.personaForm.errors);
      // Puedes mostrar mensajes de error o manejar la lógica para un formulario inválido
    }
  }
  getFormTitle(): string {
    return this.personaId ? 'Editar registro' : 'Nuevo registro';
  }

  private loadDataIntoForm(): void {
    this.personaId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.personaId) {
      this.personaService
        .getPersona(this.personaId)
        .subscribe((persona) => this.personaForm.patchValue(persona));
    }
  }
}
