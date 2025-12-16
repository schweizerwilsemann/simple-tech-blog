import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@/app/features/auth/services/auth';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!isPlatformBrowser(platformId)) {
    // On the server, allow navigation to complete.
    // The client-side will re-run the guard and handle redirection if necessary.
    return true;
  }

  // The rest of the logic runs only on the browser.
  const token = cookieService.get('Authorization');

  if (token) {
    const cleanToken = token.replace('Bearer ', '');
    
    try {
      const decodedToken: any = jwtDecode(cleanToken);

      const expirationDate = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();

      if (expirationDate < currentTime) {
        authService.logout();
        return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      }

      // At this point, token is valid.
      // We can hydrate the user state if it's not already set.
      if (authService.$user.getValue() === undefined) {
        const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        
        const user = {
          email: email,
          roles: Array.isArray(roles) ? roles : (roles ? [roles] : [])
        };
        authService.setUser(user);
      }

      // Check for 'Writer' role from the token
      const tokenRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const hasWriterRole = Array.isArray(tokenRoles) ? tokenRoles.includes('Writer') : tokenRoles === 'Writer';

      if (hasWriterRole) {
        return true;
      } else {
        // Redirect to unauthorized page
        return router.createUrlTree(['/unauthorized']);
      }

    } catch (e) {
      // Invalid token
      authService.logout();
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
  } else {
    // No token
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
};
