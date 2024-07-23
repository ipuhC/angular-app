import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { palettes } from '../../models/palettes';
import { RouterLink } from '@angular/router';
import { AdminLayoutComponent } from '../../shared/admin-layout/admin-layout.component';

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule, RouterLink, AdminLayoutComponent, ReactiveFormsModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.css'
})
export class ThemesComponent implements OnInit {
  palettes: { [key: string]: { 
    primaryColor: string; 
    secondaryColor: string; 
    complementaryColor: string;
    buttonColor: string; 
    textColor: string;
  } } = palettes;

  customThemeForm: FormGroup;
  fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana'];


  constructor(private fb: FormBuilder) {
    this.customThemeForm = this.fb.group({
      primaryColor: ['#000000'],
      secondaryColor: ['#000000'],
      complementaryColor: ['#000000'],
      buttonColor: ['#000000'],
      textColor: ['#000000'],
      font: ['Arial']
    });
  }

  ngOnInit(): void {}

  saveTheme(paletteName: string) {
    const selectedPalette = this.palettes[paletteName];
    localStorage.setItem('primaryColor', selectedPalette.primaryColor);
    localStorage.setItem('secondaryColor', selectedPalette.secondaryColor);
    localStorage.setItem('complementaryColor', selectedPalette.complementaryColor);
    localStorage.setItem('buttonColor', selectedPalette.buttonColor);
    localStorage.setItem('textColor', selectedPalette.textColor);
    alert('Theme settings saved!');
  }

  saveCustomTheme() {
    const customSettings = this.customThemeForm.value;
    localStorage.setItem('primaryColor', customSettings.primaryColor);
    localStorage.setItem('secondaryColor', customSettings.secondaryColor);
    localStorage.setItem('complementaryColor', customSettings.complementaryColor);
    localStorage.setItem('buttonColor', customSettings.buttonColor);
    localStorage.setItem('textColor', customSettings.textColor);
    localStorage.setItem('font', customSettings.font);
    document.documentElement.style.setProperty('--font-family', customSettings.font);
    alert('Custom theme settings saved!');
    window.location.reload(); 
    
  }
  resetTheme() {
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('secondaryColor');
    localStorage.removeItem('complementaryColor');
    localStorage.removeItem('buttonColor');
    localStorage.removeItem('textColor');
    localStorage.removeItem('font');
    document.documentElement.style.setProperty('--font-family', 'Arial, sans-serif');
    alert('Theme settings reset!');
    window.location.reload(); // Recarga la página para aplicar los cambios
  }
}
