import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'home-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {
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
  isVideosPage(): boolean {
    return this.router.url.startsWith('/videos');
  }
}
