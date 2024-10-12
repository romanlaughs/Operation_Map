import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../api.service';
import { SubLineItem } from '../../../shared/data/project/subline-item';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sub-line-item-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sub-line-item-dialog.component.html',
  styleUrls: ['./sub-line-item-dialog.component.scss'],
  animations: [
    trigger('transitionMessages', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', [animate('300ms')]),
      transition('* => void', [animate('300ms')]),
    ]),
  ],
})
export class SubLineItemDialogComponent {
  SublineItemForm: FormGroup;
  userEmail: string;
  projectId: string;
  sublineItemId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { projectId: string; lineItemRef: string; userEmail: string },
    private dialogRef: MatDialogRef<SubLineItemDialogComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.userEmail = data.userEmail;
    this.projectId = data.projectId;
    this.SublineItemForm = this.createSubLineItemForm();
  }

  private createSubLineItemForm(): FormGroup {
    return this.fb.group({
      lineItemName: ['', Validators.required],
      budget: [null, [Validators.required, Validators.min(0)]], // Ensure budget is a number and non-negative
      notes: [''],
      selected: [false],
      showAdditionalFields: [false],
      lineItems: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  generateSubLineItemId(): string {
    return `sublineitem-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  onSaveClick(): void {
    if (this.SublineItemForm.valid) {
      const newSubLineItem: SubLineItem = {
        id: this.generateSubLineItemId(),
        lineItemName: this.SublineItemForm.value.lineItemName,
        budget: +this.SublineItemForm.value.budget,
        notes: this.SublineItemForm.value.notes,
        selected: false,
        lineItemRef: this.data.lineItemRef,
      };

      // Save the new sub-line item to the backend
      this.apiService
        .saveSubLineItem(
          this.userEmail, // 1st argument
          this.projectId, // 2nd argument
          this.data.lineItemRef, // 3rd argument
          newSubLineItem // 4th argument (the sub-line item object)
        )
        .subscribe(
          (response) => {
            this.dialogRef.close(newSubLineItem);
          },
          (error) => {
            console.error('Error saving sub-line item:', error); // Log the error for debugging
            this.snackBar.open('Failed to save sub-line item', 'Close', {
              duration: 3000,
            });
          }
        );
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
      });
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15); // Example ID generation
  }
}
