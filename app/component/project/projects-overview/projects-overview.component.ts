import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../api.service';
import { SharedService } from '../../../shared.service';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import { Project } from '../../../shared/data/project/project-list';
import { LineItem } from '../../../shared/data/project/line-item';
import { LineItemOption } from '../../../shared/data/project/line-item-options';
import { Material } from '../../../shared/data/project/material';
import { LineItemDialogComponent } from '../../lineitems/line-item-dialog/line-item-dialog.component';
import { AddMaterialDialogComponent } from '../../materials/add-material-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UploadFileComponent } from '../../project/create-new/upload-file/upload-file.component';

@Component({
  selector: 'app-projects-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatDialogModule,
    FeathericonComponent,
    NgxPaginationModule,
  ],
  templateUrl: './projects-overview.component.html',
  styleUrls: ['./projects-overview.component.scss'],
})
export class ProjectsOverviewComponent implements OnInit {
  projectId: string;
  lineItemOptions: LineItemOption[] = [];
  project: Project = {
    id: '',
    name: '',
    startDate: new Date(),
    completionPercentage: 0,
    units: 0,
    projectStatus: 0,
  };
  dataSource: Project[] = [];
  lineItems: LineItem[] = [];
  pageLineItems: number = 1;
  materials: Material[] = [];
  userEmail: string = SharedService.getEmail();
  displayedColumns: string[] = [
    'name',
    'status',
    'city',
    'dateStarted',
    'percentageCompleted',
  ];
  materialDisplayedColumns: string[] = [
    'nameDescription',
    'datePurchased',
    'placePurchased',
    'itemNumber',
    'notes',
    'photoUploadUrl',
  ];
  materialFiles: { [key: string]: string[] } = {};

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit(): void {
    this.loadProjectData();
    this.loadLineItems();
    this.loadMaterials();
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

  loadLineItems(): void {
    this.apiService.getLineItems(this.userEmail, this.projectId).subscribe(
      (lineItems: LineItem[]) => {
        this.lineItems = lineItems;
      },
      (error: any) => {
        this.snackBar.open('Error fetching line items.', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching line items:', error);
      }
    );
  }

  loadMaterials() {
    this.apiService
      .getMaterialsByProjectId(this.userEmail, this.projectId)
      .subscribe(
        (materials) => {
          this.materials = materials;
          materials.forEach((material) => this.getFiles(material.id));
        },
        (error: any) => {
          console.error('Error fetching materials:', error);
        }
      );
  }

  getFiles(materialId: string): void {
    const containerName = this.projectId; // Replace with your container name
    this.apiService.getFilesByItemId(containerName, materialId).subscribe(
      (files) => {
        if (this.materialFiles[materialId] === undefined) {
          this.materialFiles[materialId] = files;
        } else {
          this.materialFiles[materialId].push(...files);
        }
      },
      (error) => {
        console.error('Error fetching files', error);
      }
    );
  }
  openFile(fileUrl: string): void {
    window.open(fileUrl, '_blank');
  }

  calculateProfitMargin(lineItem: LineItem): number {
    return (lineItem.budget ?? 0) - (lineItem.subcontractorCost ?? 0);
  }

  editProject(projectId: string, redirect: string = 'projects') {
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
      if (result) {
        this.loadLineItems(); // Refresh line items after dialog is closed
      }
    });
  }

  openAddMaterialDialog(): void {
    const dialogRef = this.dialog.open(AddMaterialDialogComponent, {
      width: '400px',
      data: { projectId: this.projectId, userEmail: this.userEmail },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMaterials();
        // Reload materials after adding new one
      }
    });
  }

  openUploadDialog(materialId: string): void {
    const dialogRef = this.dialog.open(UploadFileComponent, {
      width: '400px',
      data: { itemId: materialId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMaterials();
        console.log('This was called!');
        // Reload materials after adding new one
      }
    });
  }
}
