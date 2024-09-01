import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../../directives/outside.directive';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ClickOutsideDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public profile: boolean = false;
  constructor(private router: Router, public auth: AuthService) {}

  open() {
    this.profile = !this.profile;
  }

  clickOutside(): void {
    this.profile = false;
  }

  login() {
    console.log('Login button clicked');
    this.auth.loginWithRedirect();
  }

  logout() {
    console.log('Logout button clicked');
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin, federated: true },
    });
  }
}
