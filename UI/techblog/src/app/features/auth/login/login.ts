import { Component, inject } from '@angular/core';
import { LoginRequest } from '@/app/features/auth/models/login-request.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@/app/features/auth/services/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  model: LoginRequest;

  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  private router = inject(Router);


  constructor() {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit() {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        // save auth cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict'
        );

        // set user
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });

        // redirect to home page
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
