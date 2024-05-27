import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'   // Adjust the import path
import { Project } from '../models/project.model'; // Adjust the import path

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    private projectService: ApiService
  ) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  addProject() {
    this.router.navigate(['/project-form']);
  }

  editProject(projectId: string) {
    this.router.navigate(['/project-form', { id: projectId }]);
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
