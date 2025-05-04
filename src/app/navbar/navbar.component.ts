import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';
import { FastAccessService } from '../services/fast-access.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isDarkMode = true;
  isDropdownOpen = false;
  showFastAccess: boolean = false;
  showDataModal: boolean = false;

  constructor(
    private themeService: ThemeService,
    private _router: Router,
    private fastAccessService: FastAccessService,
    private autService: AuthService
  ) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      document.body.className = isDarkMode ? 'bg-gray-700' : 'bg-white';
    });
    this.fastAccessService.fastAccess$.subscribe((isEnabled) => {
      this.showFastAccess = isEnabled;
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

  navegateSta(): void {
    this._router.navigate(['/statistics']);
  }

  navegateSet(): void {
    this._router.navigate(['/settings']);
  }

  navegateHow(): void {
    this._router.navigate(['/howtoplay']);
  }

  onClickHandler(event: Event): void {
    event.preventDefault();
  }

  onSignout(): void {
    this.showDataModal = true;
  }

  confirmSignout(): void {
    this.autService.signout();
  }

  cancelSignout(): void {
    location.reload();
  }
}
