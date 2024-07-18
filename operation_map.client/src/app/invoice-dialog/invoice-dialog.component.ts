import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';  // Adjust the import path
import { Material } from '../models/material.model';  // Adjust the import path

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.css']
})
export class InvoiceDialogComponent {
  invoiceForm: FormGroup;
  subcontractors: any[];

  constructor(
    public dialogRef: MatDialogRef<InvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.subcontractors = data.subcontractors;
    this.invoiceForm = this.fb.group({
      subcontractor: ['', Validators.required],
      amountPaid: [0, Validators.required],
      datePaid: ['', Validators.required],
      notes: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.invoiceForm.valid) {
      this.dialogRef.close(this.invoiceForm.value);
    }
  }
}
