import { CommonModule } from '@angular/common';
import { Inject, Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { SharedService } from '../../../shared.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogConfig,
  MatDialog,
} from '@angular/material/dialog';
import { Subcontractor } from '../../../shared/data/project/subcontractors';
import { SubcontractorGroup } from '../../../shared/data/project/subcontractorgroup';
import { AddGroupDialogComponent } from '../add-group-dialog/add-group-dialog.component';

@Component({
  selector: 'app-subcontractors-dialog',
  standalone: true,
  imports: [
    CommonModule,
    NgbNavModule,
    ReactiveFormsModule,
    FeathericonComponent,
  ],
  templateUrl: './subcontractors-dialog.component.html',
  styleUrls: ['./subcontractors-dialog.component.scss'],
})
export class SubcontractorsDialogComponent implements OnInit {
  group: SubcontractorGroup;
  subcontractorForm: FormGroup;
  subcontractors: Subcontractor[] = [];
  subcontractorId: string | null;
  selectedSubcontractors: Set<string> = new Set();
  subcontractorGroups: SubcontractorGroup[] = [];
  groups: SubcontractorGroup[] = [];
  userEmail: string;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<SubcontractorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialog: MatDialog
  ) {
    this.userEmail = SharedService.getEmail();
    this.group = data.group;
    this.subcontractorForm = this.fb.group({
      subcontractorId: [''],
      companyName: ['', Validators.required],
      contactName: ['', Validators.required],
      pdfUpload: [''],
      address: [''],
      contactPhoneNumber: [''],
      website: [''],
      contactEmail: ['', [Validators.required, Validators.email]],
      ubi: [''],
      license: [''],
      taxId: [''],
      other: [''],
      insuranceCompany: [''],
      insuranceAgent: [''],
      insurancePhone: [''],
      insuranceEmail: [''],
      additionalInsured: [false],
      certificatePDFURL: [''],
      additionalInsurancePDFURL: [''],
    });
  }

  trackById(index: number, subcontractor: Subcontractor): string {
    return subcontractor.id;
  }

  ngOnInit(): void {
    this.getSubcontractorGroups();
    this.subcontractorId = this.data.subcontractorId || null;
    this.subcontractorForm.patchValue({
      subcontractorId: this.subcontractorId,
    });
    console.log('Received subcontractorId:', this.subcontractorId);

    if (this.subcontractorId) {
      this.apiService
        .getSubcontractorById(this.userEmail, this.subcontractorId)
        .subscribe(
          (subcontractor) => {
            if (subcontractor) {
              this.subcontractorForm.patchValue(subcontractor);
              // Optionally add the subcontractorId to selectedSubcontractors
              this.selectedSubcontractors.add(subcontractor.id);
            }
          },
          (error) => console.error('Error loading subcontractor:', error)
        );
    }
    this.apiService.getSubcontractorGroups(this.userEmail).subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
    if (this.subcontractorForm.valid) {
      const newSubcontractor = {
        ...this.subcontractorForm.value,
        groupId: this.group._id,
      };
      this.dialogRef.close(newSubcontractor);
    }
  }

  getSubcontractorGroups() {
    this.apiService.getSubcontractorGroups(this.userEmail).subscribe(
      (groups: SubcontractorGroup[]) => {
        this.subcontractorGroups = groups;
      },
      (error: any) => {
        console.error('Error fetching subcontractor groups:', error);
      }
    );
  }

  onSaveClick(): void {
    if (this.subcontractorForm.valid) {
      if (this.subcontractorId) {
        // Update the existing subcontractor
        this.apiService
          .updateSubcontractor(
            this.userEmail,
            this.subcontractorId,
            this.subcontractorForm.value
          )
          .subscribe(
            () => {
              this.dialogRef.close(true);
            },
            (error) => console.error('Error updating subcontractor:', error)
          );
      } else {
        // Create a new subcontractor
        this.apiService
          .createSubcontractor(this.userEmail, this.subcontractorForm.value)
          .subscribe(
            () => {
              this.dialogRef.close(true);
            },
            (error) => console.error('Error creating subcontractor:', error)
          );
      }
    } else {
      this.alertInvalidForm();
      console.log('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  alertInvalidForm(): void {
    const invalidControls = Object.keys(this.subcontractorForm.controls).filter(
      (name) => this.subcontractorForm.controls[name].invalid
    );
    alert(`The following fields are required: ${invalidControls.join(', ')}`);
  }

  deleteSubcontractor(): void {
    const subcontractorId = this.subcontractorForm.value.subcontractorId;

    console.log('Attempting to delete subcontractor with ID:', subcontractorId);

    // Confirm deletion
    if (confirm('Are you sure you want to delete this subcontractor?')) {
      this.apiService
        .deleteSubcontractor(this.userEmail, subcontractorId)
        .subscribe(
          () => {
            // Handle successful deletion
            this.subcontractors = this.subcontractors.filter(
              (sub) => sub.id !== subcontractorId
            );
            this.dialogRef.close(true); // Close the dialog with a success status
          },
          (error) => {
            // Handle error
            console.error('Error deleting subcontractor:', error);
            alert(
              'An error occurred while deleting the subcontractor. Please try again.'
            );
          }
        );
    }
  }

  addToGroup() {
    const subcontractorIds = Array.from(this.selectedSubcontractors);
    if (subcontractorIds.length === 0) {
      console.error('No subcontractors selected.');
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px'; // Adjust width as necessary
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '0px', left: '33%' }; // Adjust as needed

    const dialogRef = this.dialog.open(AddGroupDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.apiService
          .addSubcontractorsToGroup(
            this.userEmail,
            subcontractorIds,
            result.groupName,
            result.groupCity,
            result.groupType
          )
          .subscribe({
            next: () => {
              console.log('Subcontractors added to group successfully.');
              this.getSubcontractorGroups(); // Optionally refresh groups or perform other actions
            },
            error: (error) => {
              console.error('Error adding subcontractors to group:', error);
            },
          });
      }
    });
  }

  // Method to determine if a subcontractor is selected
  isSelected(subcontractorId: string): boolean {
    return this.selectedSubcontractors.has(subcontractorId);
  }

  // Method to toggle subcontractor selection
  toggleSubcontractorSelection(subcontractorId: string): void {
    if (this.selectedSubcontractors.has(subcontractorId)) {
      this.selectedSubcontractors.delete(subcontractorId);
    } else {
      this.selectedSubcontractors.add(subcontractorId);
    }
  }
}
