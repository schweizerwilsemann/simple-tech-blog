import { User } from '@/app/features/auth/models/user.model';
import { AuthService } from '@/app/features/auth/services/auth';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit{
  user?: User;

  private authService = inject(AuthService);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
