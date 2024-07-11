import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from '../shared.service'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
  projectId: string = SharedService.getProjectId();

  constructor(public auth: AuthService, private router: Router, public shared: SharedService) { }

  ngOnInit() {
    console.log('Navigation initialized');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.projectId = SharedService.getProjectId();
        console.log('Route changed, projectId updated:', this.projectId);
      });
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

  goToLineItems(projectId: string) {
    this.router.navigate([`/line-items/${projectId}`]);
  }

  goToMaterials(projectId: string) {
    this.router.navigate([`/materials/${projectId}`]);
  }

  goToDocuments(projectId: string) {
    this.router.navigate([`/documents/${projectId}`]);
  }

  isProjectOverviewPage(): boolean {
    let overview = this.router.url.includes('/projects-overview');
    let materials = this.router.url.includes('material');
    let lineItems = this.router.url.includes('/line-items');

    return (overview || materials || lineItems);
  }

  logout() {
    console.log('Logout button clicked');
    this.auth.logout({ logoutParams: { returnTo: window.location.origin, federated: true } });
  }
}
