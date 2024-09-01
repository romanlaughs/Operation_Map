import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../../api.service';
import { SharedService } from '../../../shared.service';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import { Project } from '../../../shared/data/project/project-list';
import { Material } from '../../../shared/data/project/material';
import { AddMaterialDialogComponent } from '../../materials/material-dialog/add-material-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UploadFileComponent } from '../../project/create-new/upload-file/upload-file.component';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule,
    MatDialogModule,
    FeathericonComponent,
    NgxPaginationModule,
  ],
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent implements OnInit {
  projectId: string;
  materialLineItems: number = 1;
  materials: Material[] = [];
  userEmail: string = SharedService.getEmail();
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
    public dialog: MatDialog
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit(): void {
    this.loadMaterials();
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
