import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../api.service';
import { Project } from '../../../../shared/data/project/project-list';
import { SharedService } from '../../../../shared.service';
import { FeathericonComponent } from '../../../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-dashboard-bids',
  standalone: true,
  imports: [CommonModule, FeathericonComponent, RouterModule],
  templateUrl: './bids.component.html',
  styleUrl: './bids.component.scss',
})
export class DashboardBiddingComponent implements OnInit {
  projects: Project[] = [];
  email: string = SharedService.getEmail();

  constructor(private router: Router, private projectService: ApiService) {}

  ngOnInit(): void {
    this.getAllProjects(this.email);
  }

  getAllProjects(userEmail: string, projectStatus: number = 0) {
    this.projectService.getProjects(userEmail, projectStatus).subscribe(
      (projects) => {
        this.projects = projects
          .sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          )
          .slice(0, 4); // Get the top 4 projects
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
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

  deleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?'))
      if (projectId) {
        this.projectService
          .deleteProject(this.email, projectId)
          .subscribe(() => {
            this.router.navigate(['/dashboard/default']);
          });
      }
  }

  goToProjectOverview(projectId: string): void {
    SharedService.setProjectID(projectId);
    this.router.navigate(['/project/overview', projectId]);
  }
}
