import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AdminLayoutComponent } from '../shared/admin-layout/admin-layout.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink,ReactiveFormsModule, AdminLayoutComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  userRegisterForm: FormGroup;
  isFormSubmitted = false;
  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirmation: string = '';

  constructor(private authService: AuthService,private router: Router,private formBuilder: FormBuilder,) {
    this.userRegisterForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(8),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
   }
  
   ngOnInit(): void {
    this.userRegisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(4)]],
    });
  }


  onSubmit(): void {
    this.isFormSubmitted = true;

    if (this.userRegisterForm.invalid) {
      
      alert('Invalid form');
      return;
    }

    const { name, email, password, passwordConfirmation } = this.userRegisterForm.value;

    if (password !== passwordConfirmation) {
      alert('Passwords do not match');
      return; // You can add an error message here to indicate that passwords do not match
    }

    this.authService.register(name, email, password, passwordConfirmation).subscribe({
      next: (response) => {
        console.log('Registration successful!', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }
  
}