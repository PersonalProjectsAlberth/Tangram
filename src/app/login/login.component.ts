import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.checkAuthentication()) {
      this.router.navigate(['/shape']);
    };

    setTimeout(() => {
      this.isVisible = true;
    }, 0);
  }

  onLogin(event: Event): void {
    event.preventDefault();
    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.errorMessage = 'Invalid credentials!';
    }
  }

}
