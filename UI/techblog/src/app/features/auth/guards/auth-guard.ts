// src/app/core/guards/auth.guard.ts
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@/app/features/auth/services/auth';
import { isPlatformBrowser } from '@angular/common';
import { TokenUtils } from '@/app/features/auth/utils/token.utils';

export const authGuard: CanActivateFn = (state) => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = cookieService.get('Authorization');
  const loginUrl = router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });

  if (!token) {
    authService.logout();
    return loginUrl;
  }

  const decodedToken = TokenUtils.decode(token);

  if (!decodedToken || TokenUtils.isExpired(decodedToken)) {
    authService.logout();
    return loginUrl;
  }

  // Hydrate user state if needed
  if (!authService.$user.getValue()) {
    authService.setUser({
      email: TokenUtils.getEmail(decodedToken),
      roles: TokenUtils.getRoles(decodedToken)
    });
  }

  // Check Writer role
  if (TokenUtils.hasRole(decodedToken, 'Writer')) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
