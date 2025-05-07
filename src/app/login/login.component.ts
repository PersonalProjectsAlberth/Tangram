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
  showPassword: boolean = false;
  timer: number = 0;
  timerInterval: any;

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

  startTimer(): void {
    this.timer = 10
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  togglePasswordVisibility(): void {
    this.showPassword = true;
    if (this.timer === 0) {
      this.startTimer();
    }
    setTimeout(() => {
      this.showPassword = false;
    }, 10000);
  }

}
