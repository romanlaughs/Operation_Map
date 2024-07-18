import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service'; // Adjust the import path
import { Project } from '../models/project.model'; // Adjust the import path
import { SharedService } from '../shared.service'
import { LineItem } from '../models/lineitem.model';

@Component({
  selector: 'app-projects-overview',
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.css']
})
export class ProjectsOverviewComponent implements OnInit {
  projectId: string;
  project: Project = {
      id: '',
      name: '',
      startDate: new Date(),
      completionPercentage: 0,
      units: 0,
      projectStatus: 0,
  };
  dataSource: Project[] = [];
  lineItems: LineItem[] = []; // Replace 'any' with your line item model
  userEmail: string = SharedService.getEmail();
  displayedColumns: string[] = ['name', 'status', 'city', 'dateStarted', 'percentageCompleted'];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit(): void {
    this.loadProjectData();
    this.loadLineItems();
  }

  loadProjectData(): void {
    this.apiService.getProjectById(this.userEmail, this.projectId).subscribe(
      (project: Project) => {
        this.project = project;
        this.dataSource = [project];
      },
      (error: any) => {
        console.error('Error fetching project data:', error);
      }
    );
  }

  loadLineItems(): void {
    this.apiService.getLineItems(this.userEmail, this.projectId).subscribe(
      (lineItems: LineItem[]) => {
        this.lineItems = lineItems;
      },
      (error: any) => {
        console.error('Error fetching line items:', error);
      }
    );
  }

  calculateProfitMargin(lineItem: LineItem): number {
    let profitMargin = (lineItem.budget ?? 0) - (lineItem.subcontractorCost ?? 0);
    if (profitMargin) {
      return profitMargin;
    }
    else {
      return 0;
    }
  }
}
