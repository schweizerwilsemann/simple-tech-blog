import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService = inject(CookieService);
  const token = cookieService.get('Authorization');

  if (token && shouldInterceptorRequest(req)) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
    return next(authRequest);
  }

  return next(req);
};

const shouldInterceptorRequest = (req: HttpRequest<any>): boolean => {
  return req.urlWithParams.indexOf('addAuth=true', 0) > -1? true : false;
}
