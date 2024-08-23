import { Component, Inject, OnInit } from '@angular/core';
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
import { ApiService } from '../../../api.service';
import { SharedService } from '../../../shared.service';
import { LineItem } from '../../../shared/data/project/line-item';
import { LineItemOption } from '../../../shared/data/project/line-item-options';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations'; // Correct import for animations

@Component({
  selector: 'app-line-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './line-item-dialog.component.html',
  styleUrls: ['./line-item-dialog.component.scss'],
  animations: [
    trigger('transitionMessages', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', [animate('300ms')]),
      transition('* => void', [animate('300ms')]),
    ]),
  ],
})
export class LineItemDialogComponent implements OnInit {
  lineItemForm: FormGroup;
  lineItemOptions: LineItemOption[] = [];
  userEmail: string = SharedService.getEmail();
  projectId: string = SharedService.getProjectId();

  constructor(
    public dialogRef: MatDialogRef<LineItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { projectId: string; userEmail: string },
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.lineItemForm = this.fb.group({
      lineItemName: ['', Validators.required],
      budget: [0],
      notes: [''],
    });

    this.projectId = data.projectId;
    this.userEmail = data.userEmail;
  }

  ngOnInit(): void {
    if (this.projectId && this.userEmail) {
      this.getLineItemOptions();
    } else {
      console.error('Invalid projectId or userEmail');
    }
  }

  getLineItemOptions(): void {
    if (this.projectId && this.userEmail) {
      this.apiService
        .getProjectById(this.userEmail, this.projectId)
        .subscribe((project) => {
          if (project && project.lineItemOptions) {
            this.lineItemOptions = project.lineItemOptions;
          }
        });
    } else {
      console.error('Project ID or User Email is missing');
    }
  }

  onSaveClick(): void {
    if (this.lineItemForm.valid) {
      const newLineItem: LineItem = { ...this.lineItemForm.value };

      this.apiService
        .createLineItem(this.userEmail, this.projectId, newLineItem)
        .subscribe(
          () => {
            this.dialogRef.close(true); // Closing the dialog and returning true on success
          },
          (error) => {
            console.error('Error creating line item:', error);
          }
        );
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
