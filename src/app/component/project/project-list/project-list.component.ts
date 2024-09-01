import { Component, OnInit } from '@angular/core';
import { Project } from '../../../shared/data/project/project-list';
import { CommonModule } from '@angular/common';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import { RouterModule, Router } from '@angular/router';
import { SharedService } from '../../../shared.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FeathericonComponent, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'], // Corrected styleUrl to styleUrls
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  email: string = SharedService.getEmail();
  constructor(private projectService: ApiService, private router: Router) {}

  ngOnInit(): void {
    console.log('Fetching projects for email:', this.email);
    this.getAllProjects(this.email);
  }

  getAllProjects(userEmail: string, projectStatus: number = 1) {
    this.projectService.getProjects(userEmail, projectStatus).subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
}
