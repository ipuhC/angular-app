import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { palettes } from '../../models/palettes';
import { RouterLink } from '@angular/router';
import { AdminLayoutComponent } from '../../shared/admin-layout/admin-layout.component';
@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule, RouterLink, AdminLayoutComponent],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css'
})
export class ThemesComponent {
  palettes: { [key: string]: { primaryColor: string; secondaryColor: string; backgroundColor: string; } } = palettes;

  saveTheme(paletteName: string) {
    const selectedPalette = this.palettes[paletteName];
    localStorage.setItem('primaryColor', selectedPalette.primaryColor);
    localStorage.setItem('secondaryColor', selectedPalette.secondaryColor);
    localStorage.setItem('backgroundColor', selectedPalette.backgroundColor);
    alert('Theme settings saved!');
  }
}
