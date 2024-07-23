import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HomeNavbarComponent } from '../shared/home-navbar/home-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HomeNavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  primaryColor: string = '';
  secondaryColor: string = '';
  complementaryColor: string = '';
  buttonColor: string = '';
  textColor: string = '';
  date = new Date().getFullYear();
  
  ngOnInit() {
    this.primaryColor = localStorage.getItem('primaryColor') || '#1f2937';
    this.secondaryColor = localStorage.getItem('secondaryColor') || '#111827';
    this.complementaryColor = localStorage.getItem('complementaryColor') || '#4b5563';
    this.buttonColor = localStorage.getItem('buttonColor') || '#9ca3af';
    this.textColor = localStorage.getItem('textColor') || '#dbe7e4';
  }

  constructor(private authService: AuthService,private router: Router) {}
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  logout() {
    this.authService.logout();
    console.log('Logged out');
  }
  isAdmin(){
    return this.authService.getRole() === 'admin';
  }
}
