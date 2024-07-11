import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';  // Adjust the import path
import { Material } from '../models/material.model';  // Adjust the import path
import { AddMaterialDialogComponent } from '../add-material-dialog/add-material-dialog.component';  // Adjust the import path
import { SharedService } from '../shared.service'
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private apiService: ApiService, public dialog: MatDialog, private route: ActivatedRoute)
 {
  this.projectId = this.route.snapshot.paramMap.get('projectId')!;
}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials() {
    this.apiService.getMaterialsByProjectId(this.userEmail, this.projectId).subscribe(
      (materials) => {
        this.materials = materials;
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
        this.loadMaterials();  // Reload materials after adding new one
      }
    });
  }
}
