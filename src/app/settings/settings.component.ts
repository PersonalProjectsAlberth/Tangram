import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { CommonModule } from '@angular/common';
import { FastAccessService } from '../services/fast-access.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  isDarkMode = true;

  constructor(private themeService: ThemeService, private fastAccessService: FastAccessService) {}

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

  toggleLanguage(): void {
  }

  toggleFastAccess(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.fastAccessService.setFastAccess(isChecked);
  }

  get fastAccess(): boolean {
    return this.fastAccessService.getFastAccess();
  }

}
