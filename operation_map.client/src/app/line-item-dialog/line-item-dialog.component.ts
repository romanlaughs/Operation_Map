import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineItem } from '../models/lineitem.model';
import { ApiService } from '../api.service';  // Adjust the import path
import { Material } from '../models/material.model';  // Adjust the import path
import { SharedService } from '../shared.service';
import { Project } from '../models/project.model';
import { LineItemOption } from '../models/line-item-option.model';

@Component({
  selector: 'app-line-item-dialog',
  templateUrl: './line-item-dialog.component.html',
  styleUrls: ['./line-item-dialog.component.css']
})
export class LineItemDialogComponent implements OnInit{
  lineItemForm: FormGroup;
  lineItemOptions: LineItemOption[] = [];
  userEmail: string = SharedService.getEmail();
  projectId: string = SharedService.getProjectId();

  constructor(
    public dialogRef: MatDialogRef<LineItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: string, userEmail: string },
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.lineItemForm = this.fb.group({
      lineItemName: ['', Validators.required],
      budget: 0,
      bidSelected: [false],
      notes: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getLineItemOptions(): void {
    this.apiService.getProjectById(this.userEmail, this.projectId).subscribe((project) => {
      if (project && project.lineItemOptions) {
        this.lineItemOptions = project.lineItemOptions;
      }
    })
  }

  ngOnInit(): void {
    this.getLineItemOptions();
  }

  onSaveClick(): void {
    if (this.lineItemForm.valid) {
      const newLineItem: LineItem = {
        ...this.lineItemForm.value
      };

      this.apiService.createLineItem(this.userEmail, this.projectId, newLineItem).subscribe(() => {
        this.dialogRef.close(true);
      }, (error) => {
        console.error('Error creating material:', error);
      });
    }
  }
}
