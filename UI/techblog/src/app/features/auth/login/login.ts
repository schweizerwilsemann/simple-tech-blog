import { Component } from '@angular/core';
import { LoginRequest } from '@/app/features/auth/models/login-request.model';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  model: LoginRequest;


  constructor() {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit() {
    console.log(this.model);
  }
}
