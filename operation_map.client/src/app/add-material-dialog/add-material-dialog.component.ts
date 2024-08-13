import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';  // Adjust the import path
import { Material } from '../models/material.model';  // Adjust the import path
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-material-dialog',
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.css']
})
export class AddMaterialDialogComponent {
  materialForm: FormGroup;
  projectIds: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddMaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: string, userEmail: string },
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.materialForm = this.fb.group({
      nameDescription: ['', Validators.required],
      datePurchased: [''],
      placePurchased: [''],
      notes: [''],
      itemNumber: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (!this.projectIds.includes(this.data.projectId)) {
      this.projectIds.push(this.data.projectId)
    };
    if (this.materialForm.valid && this.projectIds.length > 0) {
      const newMaterial: Material = {
        ...this.materialForm.value,
        projectIds: this.projectIds
      };

      this.apiService.createMaterial(this.data.userEmail, newMaterial).subscribe(() => {
        this.dialogRef.close(true);
      }, (error) => {
        console.error('Error creating material:', error);
      });
    }
  }
}
