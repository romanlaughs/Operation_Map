import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service'; // Adjust the import path as needed
import { Subcontractor } from '../models/subcontractor.model'; // Adjust the import path as needed
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-subcontractor-dialog',
  templateUrl: './subcontractor-dialog.component.html',
  styleUrls: ['./subcontractor-dialog.component.css']
})
export class SubcontractorDialogComponent implements OnInit {
  isEdit: boolean = false;
  subcontractorForm: FormGroup;
  subcontractors: Subcontractor[] = [];
  userEmail: string = SharedService.getEmail();
  lineItemId: string = SharedService.getLineItemId();
  projectId: string = SharedService.getProjectId();
  lineItem: any; // Define a proper interface if available
  invoices: any[] = [];
  subcontractorColumns: string[] = ['subcontractorName', 'bidDate', 'startDate', 'endDate', 'bidPrice']; // Add other column names as needed
  invoiceColumns: string[] = ['invoiceDate', 'invoiceAmount', 'subcontractorName', 'notes']; // Add other column names as needed


  constructor(
    public dialogRef: MatDialogRef<SubcontractorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.subcontractorForm = this.fb.group({
      companyName: ['', Validators.required],
      bidDate: ['', Validators.required],
      dateStarted: ['', Validators.required],
      dateFinished: ['', Validators.required],
      bidPrice: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.subcontractorForm.patchValue(this.data);
      this.isEdit = true;
    }
    this.loadSubcontractors();
  }

  loadSubcontractors() {
    this.apiService.getSubcontractors(this.userEmail).subscribe(subcontractors => {
      this.subcontractors = subcontractors;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (!this.isEdit) {
      if (this.subcontractorForm.valid) {
        this.apiService.updateLineItemSubs(this.userEmail, this.projectId, this.lineItemId, this.subcontractorForm.value).subscribe(() => {
          this.dialogRef.close();
        });
      }
    }
    else {
      if (this.subcontractorForm.valid) {
        this.apiService.updateLineItemSubs(this.userEmail, this.projectId, this.lineItemId, this.subcontractorForm.value).subscribe(() => {
          this.dialogRef.close();
        });
      }
    }
  }

  addNewSubcontractor() {
    this.dialogRef.close();
    this.router.navigate(['/subcontractor-form'], { queryParams: { from: 'line-item-overview' } });
  }
}
