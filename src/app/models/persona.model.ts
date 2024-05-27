export interface Persona {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    correo:string;
    telefono:string;
    direccion:string;
    estado:string;
    ciudad:string;
    created_at?:string;
    updated_at?:string;
}