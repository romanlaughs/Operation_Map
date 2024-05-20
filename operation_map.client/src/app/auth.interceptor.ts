import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.auth.getAccessTokenSilently()).pipe(
      switchMap(token => {
        if (token) {
          const tokenReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
          });
          return next.handle(tokenReq);
        }
        return next.handle(req);
      })
    );
  }
}

