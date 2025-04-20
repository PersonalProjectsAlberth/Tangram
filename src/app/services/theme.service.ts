import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject: BehaviorSubject<boolean>;

  darkMode$;

  constructor() {

    const savedDarkMode = localStorage.getItem('darkMode');
    const initialDarkMode = savedDarkMode !== null ? JSON.parse(savedDarkMode) : false;

    this.darkModeSubject = new BehaviorSubject<boolean>(initialDarkMode);
    this.darkMode$ = this.darkModeSubject.asObservable();
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkModeSubject.next(isDarkMode);

    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }
}
