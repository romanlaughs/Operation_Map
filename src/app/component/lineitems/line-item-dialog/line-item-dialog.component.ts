import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../../api.service';
import { LineItem } from '../../../shared/data/project/line-item';
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
  selector: 'app-line-item-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
export class LineItemDialogComponent {
  lineItemForm: FormGroup;
  userEmail: string;
  projectId: string;
  defaultLineItems = [
    {
      lineItemName: 'Clearing',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Demolition',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Excavation',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Foundation',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Drainage',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Electrical Underground',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Water Line Connection',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Side Sewer Connection',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Framing',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Roofing',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Windows',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Decking',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Garage Door',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Gutters',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Flashing',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Waterproofing',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Siding',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Concrete Flat Work',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Painting Outside',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Painting Inside',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Electrical',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Plumbing',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Heating / AC',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Fire Sprinkler',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Low voltage',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Insulation',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Drywall',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Hardwood Flooring',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Carpet',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Tile',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Outside Stone/tile',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Kitchen Cabinet Install',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Countertop Install',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Hardware Install',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Mirrors',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Shower Glass Door',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Closet Install',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Millwork Doors and Trim',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Grading',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Landscaping',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Fencing',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Driveway Paving',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Driveway Concrete',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Cleaning',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Tool / Equipment Rental',
      budget: '',
      notes: '',
    },
    {
      lineItemName: 'Day Labor Help',
      budget: '',
      notes: '',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<LineItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { projectId: string; userEmail: string },
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.userEmail = data.userEmail;
    this.projectId = data.projectId;
    this.lineItemForm = this.createLineItemForm();
  }

  private createLineItemForm(): FormGroup {
    return this.fb.group({
      lineItemName: ['', Validators.required],
      budget: ['', Validators.required],
      notes: [''],
      selected: false,
      showAdditionalFields: false,
      lineItems: this.fb.array(
        this.defaultLineItems.map((item) =>
          this.fb.group({
            lineItemName: [item.lineItemName || ''],
            budget: [item.budget || ''],
            notes: [item.notes || ''],
          })
        )
      ),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.lineItemForm.valid) {
      const newLineItem: LineItem = {
        ...this.lineItemForm.value,
        selected: false,
      };

      this.apiService
        .getLineItems(this.userEmail, this.projectId)
        .subscribe((existingItems) => {
          const exists = existingItems.some(
            (item: LineItem) => item.lineItemName === newLineItem.lineItemName
          );

          if (exists) {
            // Display a Snackbar notification to the user
            this.snackBar.open(
              'Line item already exists. Please modify the name or budget.',
              'Close',
              {
                duration: 3000, // Duration in milliseconds
              }
            );
            return; // Optionally, show a user notification here
          }

          // Proceed to create the line item
          this.apiService
            .createLineItem(this.userEmail, this.projectId, newLineItem)
            .subscribe(
              () => {
                this.dialogRef.close(true);
              },
              (error) => {
                console.error('Error creating line item:', error);
              }
            );
        });
    }
  }
}
