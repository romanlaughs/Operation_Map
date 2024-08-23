import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api.service';
import { Project } from '../../../shared/data/project/project-list';
import { SharedService } from '../../../shared.service';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-projects-archive',
  standalone: true,
  imports: [CommonModule, FeathericonComponent], // Add MatTableModule here
  templateUrl: './projects-archive.component.html',
  styleUrls: ['./projects-archive.component.scss'],
})
export class ProjectsArchiveComponent implements OnInit {
  projects: Project[] = [];
  email: string = SharedService.getEmail();

  constructor(private projectService: ApiService, private router: Router) {}

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
        this.projectService
          .deleteProject(this.email, projectId)
          .subscribe(() => {
            this.router.navigate(['/project/list']);
          });
      }
  }

  reviveProject(projectId: string, status: 1): void {
    if (projectId) {
      this.projectService
        .updateProjectStatus(this.email, projectId, status)
        .subscribe(() => {
          this.router.navigate(['/project/list']);
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
