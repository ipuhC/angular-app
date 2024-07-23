// src/app/user-profile/user-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeNavbarComponent } from '../shared/home-navbar/home-navbar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HomeNavbarComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  user: any = {};
  profilePhoto: File | null = null;
  userId: string = localStorage.getItem('userId') || '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.userProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile_photo: [null]
    });
  }

  ngOnInit(): void {
    this.authService.getUserDetails(this.userId).subscribe({
      next: (response) => {
        this.user = response.user;
        this.userProfileForm.patchValue({
          name: this.user.name,
          email: this.user.email,
        });
        console.log('User details:', this.user);
      },
      error: (error) => {
        this.errorMessage = 'Error fetching user details';
        console.error('Error fetching user details:', error);
      }
    });
  }

  onProfilePhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length) {
      this.profilePhoto = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.userProfileForm.valid) {
      const formData = new FormData();
      formData.append('name', this.userProfileForm.get('name')?.value);
      formData.append('email', this.userProfileForm.get('email')?.value);
      if (this.profilePhoto) {
        formData.append('profile_photo', this.profilePhoto);
      }

      this.authService.updateProfile(this.userId, formData ).subscribe({
        next: (response) => {
          this.successMessage = 'Perfil actualizado correctamente. Recargue la página para ver los cambios.';
          this.errorMessage = null;
          console.log('Perfil actualizado:', response);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el perfil.';
          this.successMessage = null;
          console.error('Error al actualizar el perfil:', error);
        }
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
