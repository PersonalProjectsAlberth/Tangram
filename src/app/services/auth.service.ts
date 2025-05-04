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
  }

  login(email: string, password: string): boolean {
    if (email === 'testuser1@example.com' && password === 'testuser1') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/shape']);
      return true;
    }
    return false;
  }

  signout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  checkAuthentication(): boolean {
    return this.isAuthenticated;
  }
}
