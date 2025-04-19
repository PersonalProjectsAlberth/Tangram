import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  isDarkMode = true;

  toggleBackgroundColor(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isDarkMode = isChecked;
    document.body.className = this.isDarkMode ? 'bg-gray-700' : 'bg-white';
  }
}
