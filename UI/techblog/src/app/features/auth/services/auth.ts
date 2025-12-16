import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '@/app/features/auth/models/login-request.model';
import { LoginResponse } from '@/app/features/auth/models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private APP_API_URL = environment.apiBaseUrl;

  constructor() {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.APP_API_URL}/auth/login`, {
      email: request.email,
      password: request.password
    });
  }
}
