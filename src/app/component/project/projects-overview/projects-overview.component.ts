import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../../api.service';
import { SharedService } from '../../../shared.service';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import { Project } from '../../../shared/data/project/project-list';
import { LineItemDialogComponent } from '../../lineitems/line-item-dialog/line-item-dialog.component';
import { AddMaterialDialogComponent } from '../../materials/material-dialog/add-material-dialog.component';
import { LineItemsComponent } from '../../lineitems/line-items/line-items.component';
import { MaterialListComponent } from '../../materials/material-list/material-list.component';

@Component({
  selector: 'app-projects-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSnackBarModule, // Ensure SnackBar module is added here
    RouterModule,
    MatDialogModule,
    FeathericonComponent,
    LineItemsComponent,
    MaterialListComponent,
  ],
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.scss'],
})
export class ProjectsOverviewComponent implements OnInit {
  public active = 1;
  public openTab: string = 'lineitems';
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
  userEmail: string = SharedService.getEmail(); // Check if this method is static

  public tabbed(val: string) {
    this.openTab = val;
  }

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit(): void {
    this.loadProjectData();
  }

  loadProjectData(): void {
    this.apiService.getProjectById(this.userEmail, this.projectId).subscribe(
      (project: Project) => {
        this.project = project;
        this.dataSource = [project];
      },
      (error: any) => {
        this.snackBar.open('Error fetching project data.', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching project data:', error);
      }
    );
  }

  editProject(redirect: string = 'projects') {
    this.router.navigate([
      '/project/edit/project-form',
      { id: this.projectId, redirect: redirect },
    ]);
  }

  onArchive(): void {
    if (this.projectId) {
      this.apiService
        .updateProjectStatus(this.userEmail, this.projectId, -1)
        .subscribe(() => {
          this.router.navigate(['/project/archive']);
        });
    }
  }

  openDialog(projectId: string): void {
    const dialogRef = this.dialog.open(LineItemDialogComponent, {
      width: '400px',
      data: { projectId: projectId, userEmail: this.userEmail },
    });

    dialogRef.afterClosed().subscribe((result) => {
      window.location.reload();
    });
  }

  openAddMaterialDialog(): void {
    const dialogRef = this.dialog.open(AddMaterialDialogComponent, {
      width: '400px',
      data: { projectId: this.projectId, userEmail: this.userEmail },
    });

    dialogRef.afterClosed().subscribe((result) => {
      window.location.reload();
    });
  }
}
