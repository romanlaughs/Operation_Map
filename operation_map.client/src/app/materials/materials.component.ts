import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';  // Adjust the import path
import { Material } from '../models/material.model';  // Adjust the import path
import { AddMaterialDialogComponent } from '../add-material-dialog/add-material-dialog.component';  // Adjust the import path
import { SharedService } from '../shared.service'
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadComponent } from '../file-upload/file-upload.component'

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {
  materials: Material[] = [];
  projectId: string;
  userEmail: string = SharedService.getEmail();
  displayedColumns: string[] = ['nameDescription', 'datePurchased', 'placePurchased', 'itemNumber', 'notes', 'photoUploadUrl'];
  materialFiles: {[key: string]: string[]} = {};

  constructor(private apiService: ApiService, public dialog: MatDialog, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials() {
    this.apiService.getMaterialsByProjectId(this.userEmail, this.projectId).subscribe(
      (materials) => {
        this.materials = materials;
        materials.forEach((material) => this.getFiles(material.id))
      },
      (error: any) => {
        console.error('Error fetching materials:', error);
      }
    );
  }

  openAddMaterialDialog(): void {
    const dialogRef = this.dialog.open(AddMaterialDialogComponent, {
      width: '400px',
      data: { projectId: this.projectId, userEmail: this.userEmail }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMaterials();
        // Reload materials after adding new one
      }
    });
  }

  openUploadDialog(materialId: string): void {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '400px',
      data: { itemId: materialId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMaterials();
        console.log('This was called!')
        // Reload materials after adding new one
      }
    });
  }

  //
  getFiles(materialId: string): void {
    const containerName = this.projectId;  // Replace with your container name
    this.apiService.getFilesByItemId(containerName, materialId).subscribe(
      files => {
        if (this.materialFiles[materialId] === undefined) {
          this.materialFiles[materialId] = files;
        }
        else {
          this.materialFiles[materialId].push(...files);
        }
      },
      error => {
        console.error('Error fetching files', error);
      }
    );
  }
  openFile(fileUrl: string): void {
    window.open(fileUrl, '_blank');
  }
}
