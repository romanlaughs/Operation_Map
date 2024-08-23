import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { tap, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    return this.auth.isAuthenticated$.pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return of(true); // User is authenticated, allow access
        } else {
          // User is not authenticated, redirect to login
          this.auth.loginWithRedirect(); // Redirect to Auth0 login page
          return of(false); // Block access until authentication is complete
        }
      })
    );
  }
}
