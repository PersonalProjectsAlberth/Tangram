import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isDarkMode = true;
  isDropdownOpen = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      document.body.className = isDarkMode ? 'bg-gray-700' : 'bg-white';
    });
  }

  toggleBackgroundColor(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.themeService.setDarkMode(isChecked);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
