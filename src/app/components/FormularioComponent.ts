import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mi-formulario',
  templateUrl: './mi-formulario.component.html',
  styleUrls: ['./mi-formulario.component.css'],
})
export class MiFormularioComponent {
  // Formulario
  form = new FormGroup({
    estado: new FormControl(''),
    ciudad: new FormControl({ value: '', disabled: true }),
  });

  // Datos simulados para estados y ciudades
  estados = [
    { id: 1, nombre: 'Carabobo' },
    { id: 2, nombre: 'Aragua' },
    { id: 3, nombre: 'Zulia' },
  ];

  ciudadesPorEstado: { [key: number]: string[] } = {
    1: ['Naguanagua', 'Valencia', 'Guacara'],
    2: ['Turmero', 'El Limon', 'La Victoria'],
    3: ['Maracaibo', 'Cabimas', 'Ciudad Ojeda'],
  };

  ciudades: string[] = [];

  constructor() {
    // Escuchar cambios en el control de 'estado'
    this.form.get('estado')!.valueChanges.subscribe((value) => {
      if (value != null) {
        const index = Number(value); // Convierte el valor a número
        this.ciudades = this.ciudadesPorEstado[index] || [];
        this.form.get('ciudad')!.setValue('');
        this.form.get('ciudad')!.enable();
      }
    });
  }
}
