import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isDarkMode = true;
  isDropdownOpen = false;

  constructor(private themeService: ThemeService, private _router: Router) {}

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownButton = document.getElementById('user-menu-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (
      dropdownButton &&
      dropdownMenu &&
      !dropdownButton.contains(target) &&
      !dropdownMenu.contains(target)
    ) {
      this.closeDropdown();
    }
  }

  @HostListener('document:scroll')
  onDocumentScroll() {
    this.closeDropdown();
  }

  navegate(): void {
    this._router.navigate(['/statistics']);
  }
}
