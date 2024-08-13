import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'   // Adjust the import path
import { Project } from '../models/project.model'; // Adjust the import path
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-projects-bidding',
  templateUrl: './projects-bidding.component.html',
  styleUrl: './projects-bidding.component.css'
})
export class ProjectsBiddingComponent {
  projects: Project[] = [];
  email: string = SharedService.getEmail();

  constructor(
    public auth: AuthService,
    private router: Router,
    private projectService: ApiService
  ) { }

  ngOnInit(): void {
    this.getAllProjects(this.email);
  }

  getAllProjects(userEmail: string, projectStatus: number = 0) {
    this.projectService.getProjects(userEmail, projectStatus).subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  editProject(projectId: string, redirect: string = 'projects-bidding') {
    this.router.navigate(['/project-form', { id: projectId, redirect: redirect }]);
  }

  addProject() {
    this.router.navigate(['/project-form', { status: 0 }]);
  }

  updateProjectStatus(projectId: string, status: 1): void {
    if (projectId) {
      this.projectService.updateProjectStatus(this.email, projectId, status).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }

  goToProjectOverview(projectId: string): void {
    SharedService.setProjectID(projectId);
    this.router.navigate(['/projects-overview', projectId]);
  }

  getProjectStatus(status: number): string {
    switch (status) {
      case 0:
        return 'Bidding';
      case 1:
        return 'In Progress';
      case -1:
        return 'Archived';
      default:
        return 'Unknown';
    }
  }

}
