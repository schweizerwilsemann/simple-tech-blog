import { inject, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '@/app/features/auth/models/login-request.model';
import { LoginResponse } from '@/app/features/auth/models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';
import { User } from '@/app/features/auth/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // create behaviour object
  $user = new BehaviorSubject<User | undefined>(undefined);


  private http = inject(HttpClient);
  private APP_API_URL = environment.apiBaseUrl;
  private cookieService = inject(CookieService);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.$user.next(this.getUser());
    }
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.APP_API_URL}/auth/login`, {
      email: request.email,
      password: request.password
    });
  };
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user-email');
      localStorage.removeItem('user-roles');
    }
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }

  getUser(): User | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const EMAIL = localStorage.getItem('user-email');
      const ROLES = localStorage.getItem('user-roles');
      if (EMAIL && ROLES) {
        return {
          email: EMAIL,
          roles: ROLES.split(',')
        }
      }
    }
    return undefined;
  };
  
  setUser (user : User): void {
    this.$user.next(user);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user-email', user.email);
      localStorage.setItem('user-roles', user.roles.join(','));
    }
  };

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  };

}
