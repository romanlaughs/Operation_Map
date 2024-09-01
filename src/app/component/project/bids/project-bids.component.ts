import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../api.service';
import { Project } from '../../../shared/data/project/project-list';
import { SharedService } from '../../../shared.service';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-project-bids',
  standalone: true,
  imports: [CommonModule, FeathericonComponent, RouterModule],
  templateUrl: './project-bids.component.html',
  styleUrl: './project-bids.component.scss',
})
export class ProjectsBiddingComponent implements OnInit {
  projects: Project[] = [];
  email: string = SharedService.getEmail();

  constructor(private router: Router, private projectService: ApiService) {}

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

  editProject(projectId: string, redirect: string = 'project-bids') {
    this.router.navigate([
      '/project/create',
      { id: projectId, redirect: redirect },
    ]);
  }

  addProject() {
    this.router.navigate(['/project/create', { status: 1 }]);
  }

  goToProjectOverview(projectId: string): void {
    SharedService.setProjectID(projectId);
    this.router.navigate(['/project/overview', projectId]);
  }

  updateProjectStatus(projectId: string, status: 1): void {
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
