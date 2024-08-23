import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Material } from '../../shared/data/project/material';
import { FeathericonComponent } from '../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-add-material-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FeathericonComponent,
  ],
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.scss'],
})
export class AddMaterialDialogComponent {
  materialForm: FormGroup;
  projectIds: string[] = [];
  materialFiles: { [key: string]: string[] } = {};
  constructor(
    public dialogRef: MatDialogRef<AddMaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { projectId: string; userEmail: string },
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
      this.projectIds.push(this.data.projectId);
    }
    if (this.materialForm.valid && this.projectIds.length > 0) {
      const newMaterial: Material = {
        ...this.materialForm.value,
        projectIds: this.projectIds,
      };

      this.apiService
        .createMaterial(this.data.userEmail, newMaterial)
        .subscribe(
          () => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error creating material:', error);
          }
        );
    }
  }

  openFile(fileUrl: string): void {
    window.open(fileUrl, '_blank');
  }
}
