import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  primaryColor: string = '#000000';
  secondaryColor: string = '#4a4a4a';
  backgroundColor: string = '#ffffff';
  date = new Date().getFullYear();
  
  ngOnInit() {
    this.primaryColor = localStorage.getItem('primaryColor') || '#000000';
    this.secondaryColor = localStorage.getItem('secondaryColor') || '#4a4a4a';
    this.backgroundColor = localStorage.getItem('backgroundColor') || '#ffffff';
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
