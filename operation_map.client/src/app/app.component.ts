import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
import { AuthNavigationService } from './AuthNavigationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private authNavigationService: AuthNavigationService
  ) { }

  ngOnInit() {
    console.log('AppComponent initialized');
    this.authNavigationService.refreshTokenIfNeeded();
    this.authNavigationService.checkAuthenticationAndNavigate();
  }
}
