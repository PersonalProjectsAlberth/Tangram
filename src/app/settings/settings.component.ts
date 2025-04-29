import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { CommonModule } from '@angular/common';
import { FastAccessService } from '../services/fast-access.service';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { VibrationService } from '../services/vibration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  isDarkMode = true;
  currentLanguage: string;
  currentLanguageName: string = '';
  currentLanguageFlag: string = '';
  showLanguageModal: boolean = false;
  pendingLanguage: string | null = null;
  isVisible: boolean = false;
  isDropdownOpen: boolean = false;
  languages: { name: string; code: string; flag: string }[] = [];

  constructor(
    private themeService: ThemeService,
    private fastAccessService: FastAccessService,
    private languageService: LanguageService,
    private vibrationService: VibrationService,
    private http: HttpClient
  ) {
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

    this.http
      .get<{ [key: string]: { name: string; code: string; flag: string } }>(
        '/assets/languages.json'
      )
      .subscribe({
        next: (data) => {
          this.languages = Object.values(data);

          const currentLang = this.languages.find(
            (lang) => lang.code === this.currentLanguage
          );
          this.currentLanguageName = currentLang?.name || '';
          this.currentLanguageFlag = currentLang?.flag || '';
        },
        error: (err) => {
          console.error('Error loading languages.json:', err);
        },
      });
  }

  toggleBackgroundColor(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.themeService.setDarkMode(isChecked);
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

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(lang: string): void {
    this.pendingLanguage = lang;
    this.showLanguageModal = true;
    this.isDropdownOpen = false;
  }

  confirmLanguageChange2(): void {
    if (this.pendingLanguage) {
      this.languageService.setLanguage(this.pendingLanguage);
      this.currentLanguage = this.pendingLanguage;
      this.pendingLanguage = null;
      location.reload();
    }
  }

  cancelLanguageChange2(): void {
    this.pendingLanguage = null;
    window.location.href = window.location.href;
  }
}
