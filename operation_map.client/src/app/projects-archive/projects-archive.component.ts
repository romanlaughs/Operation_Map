import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'   // Adjust the import path
import { Project } from '../models/project.model'; // Adjust the import path
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-projects-archive',
  templateUrl: './projects-archive.component.html',
  styleUrl: './projects-archive.component.css'
})
export class ProjectsArchiveComponent {
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

  getAllProjects(userEmail: string, projectStatus: number = -1) {
    this.projectService.getProjects(userEmail, projectStatus).subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  deleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?'))
      if (projectId) {
        this.projectService.deleteProject(this.email, projectId).subscribe(() => {
          this.router.navigate(['/projects']);
        });
      }
  }

  reviveProject(projectId: string, status: 1): void {
      if (projectId) {
        this.projectService.updateProjectStatus(this.email, projectId, status).subscribe(() => {
          this.router.navigate(['/projects']);
        });
      }
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
