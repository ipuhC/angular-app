import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('emailInput') emailInput!: ElementRef;
  email: string = '';
  password: string = '';



  constructor(private authService: AuthService, private router: Router) {}
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        alert('Login successful!');
        console.log('Login successful', response);
        if (response.role === 'admin') {
          this.router.navigate(['/userlist']);
        }else{this.router.navigate(['/']);}
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed');
      },
      complete: () => {
        console.log('Login request completed');
      },
    });
  }

  
  ngAfterViewInit() {
    this.emailInput.nativeElement.focus();
  }

  logout() {
    this.authService.logout();
    console.log('Logged out');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
