import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
  constructor(public auth: AuthService, private router: Router, public shared: SharedService) { }

  ngOnInit() {
    console.log('Navigation initialized');
  }

  login() {
    console.log('Login button clicked');
    this.auth.loginWithRedirect();
  }

  goToProfileUpdate() {
    this.router.navigate(['/profile-update']);
  }

  goToProjects() {
    this.router.navigate(['/projects']);
  }

  goToProjectsBidding() {
    this.router.navigate(['/projects-bidding']);
  }

  goToProjectsArchive() {
    this.router.navigate(['/projects-archive']);
  }

  goToSubcontractors() {
    this.router.navigate(['/subcontractors']);
  }

  logout() {
    console.log('Logout button clicked');
    this.auth.logout({ logoutParams: { returnTo: window.location.origin, federated: true } });
  }
}
