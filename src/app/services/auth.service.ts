import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {
    const auth = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = auth === 'true';
    console.log('AuthService initialized, isAuthenticated:', this.isAuthenticated);
  }

  login(email: string, password: string): boolean {
    if (email === 'testuser1@example.com' && password === 'testuser1' || email === '1' && password === '1') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/shape']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  checkAuthentication(): boolean {
    return this.isAuthenticated;
  }
}
