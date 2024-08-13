import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { tap, map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/home']);
      }
    }),
    map(isAuthenticated => isAuthenticated)
  );
};
