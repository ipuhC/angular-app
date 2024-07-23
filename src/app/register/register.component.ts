import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AdminLayoutComponent } from '../shared/admin-layout/admin-layout.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, AdminLayoutComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  isFormSubmitted = false;
  profilePhoto: File | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.userRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]],
      profile_photo: [null]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    console.log("se subio una imagen");
    if (event.target.files.length > 0) {
      this.profilePhoto = event.target.files[0];
      console.log(this.profilePhoto);
    }
  }

  onSubmit(): void {
    this.isFormSubmitted = true;

    if (this.userRegisterForm.invalid) {
      alert('Formulario inválido');
      return;
    }

    const { name, email, password, passwordConfirmation } = this.userRegisterForm.value;

    if (password !== passwordConfirmation) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    if (this.profilePhoto) {
      formData.append('profile_photo', this.profilePhoto);
    }

    this.authService.register(formData).subscribe({
      next: (response) => {
        console.log('Registro exitoso!', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Fallo en el registro', error);
      }
    });
  }
}
