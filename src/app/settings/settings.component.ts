import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { CommonModule } from '@angular/common';
import { FastAccessService } from '../services/fast-access.service';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { VibrationService } from '../services/vibration.service';

@Component({
  selector: 'app-settings',
  imports: [CommonModule,TranslatePipe],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  isDarkMode = true;
  currentLanguage: string;
  newLanguage: string = '';
  showLanguageModal: boolean = false;
  pendingLanguage: string | null = null;
  isVisible: boolean = false;

  constructor(
    private themeService: ThemeService,
    private fastAccessService: FastAccessService,
    private languageService: LanguageService,
    private vibrationService: VibrationService) {
      this.currentLanguage = this.languageService.getLanguage();
    }

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      document.body.className = isDarkMode ? 'bg-gray-700' : 'bg-white';
    });
    setTimeout(() => {
      this.isVisible = true;
    }, 0);
  }

  toggleBackgroundColor(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.themeService.setDarkMode(isChecked);
  }

  toggleLanguage(): void {
    this.showLanguageModal = true;
    this.newLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
    this.pendingLanguage = this.newLanguage;
  }

  confirmLanguageChange(): void {
    if (this.pendingLanguage) {
      this.languageService.setLanguage(this.pendingLanguage);
      this.currentLanguage = this.pendingLanguage;
      this.pendingLanguage = null;
      window.location.href = window.location.href;
    }
  }

  cancelLanguageChange(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
    this.pendingLanguage = null;
    location.reload();
  }

  toggleFastAccess(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.fastAccessService.setFastAccess(isChecked);
  }

  get fastAccess(): boolean {
    return this.fastAccessService.getFastAccess();
  }

  toggleVibration(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.vibrationService.setVibration(isChecked);
  }

  get vibration(): boolean {
    return this.vibrationService.getVibration();
  }
}
