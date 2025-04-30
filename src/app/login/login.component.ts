import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor( private router: Router) { }

  onLogin(): void {
    const validUsername = 'admin';
    const validPassword = 'admin';

    if (this.username === validUsername && this.password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/shape']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

}
