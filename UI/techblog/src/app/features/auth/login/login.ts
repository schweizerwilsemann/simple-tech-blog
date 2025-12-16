import { Component, inject } from '@angular/core';
import { LoginRequest } from '@/app/features/auth/models/login-request.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@/app/features/auth/services/auth';

@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  model: LoginRequest;

  private authService = inject(AuthService);


  constructor() {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit() {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
