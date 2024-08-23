import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AuthNavigationService {
  private navigationChecked = false; // Add this flag

  constructor(
    private auth: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {}

  checkAuthenticationAndNavigate(): void {
    if (this.navigationChecked) return; // Prevent multiple checks
    this.navigationChecked = true;

    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('User is authenticated');
        this.auth.user$
          .pipe(
            switchMap((user) => {
              if (user?.email) {
                SharedService.setEmail(user.email);
                let checkComplete = this.apiService.isUserInfoComplete(
                  user.email
                );
                return checkComplete;
              } else {
                return of(null);
              }
            })
          )
          .subscribe((result) => {
            if (result && result.isComplete) {
              if (this.router.url !== '/') {
                this.router.navigate(['/']);
                console.log('Navigating to /');
              }
            } else {
              if (this.router.url !== '/') {
                this.router.navigate(['/']);
                console.log('Navigating to /');
              }
            }
          });
      } else {
        if (this.router.url !== '/') {
          console.log('User is not authenticated, redirecting to /');
          this.router.navigate(['/']);
        }
      }
    });
  }

  refreshTokenIfNeeded(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth.getAccessTokenSilently().subscribe();
      }
    });
  }

  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated && this.router.url !== '/') {
          this.router.navigate(['/']);
        }
      }),
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return this.auth.user$.pipe(
            switchMap((user) => {
              if (user?.email) {
                SharedService.setEmail(user.email);
                let checkComplete = this.apiService.isUserInfoComplete(
                  user.email
                );
                return checkComplete.pipe(
                  tap((result) => {
                    if (result.isComplete) {
                      if (this.router.url !== '/') {
                        this.router.navigate(['/']);
                      }
                    } else {
                      if (this.router.url !== '/') {
                        this.router.navigate(['/']);
                      }
                    }
                  }),
                  switchMap((result) => of(result.isComplete))
                );
              } else {
                if (this.router.url !== '/') {
                  this.router.navigate(['/']);
                }
                return of(false);
              }
            })
          );
        } else {
          return of(false);
        }
      })
    );
  }
}
