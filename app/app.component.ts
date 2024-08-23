import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TapToTopComponent } from './shared/component/tap-to-top/tap-to-top.component';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { AuthNavigationService } from './AuthNavigationService';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TapToTopComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private route: RouterModule,
    private authNavigationService: AuthNavigationService
  ) {
    this.auth.handleRedirectCallback().subscribe();
  }

  ngOnInit() {
    console.log('AppComponent initialized');
    this.authNavigationService.refreshTokenIfNeeded();
    this.authNavigationService.checkAuthenticationAndNavigate();
  }
}
