import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../api.service';
import { LineItem } from '../../../shared/data/project/line-item';
import { SubLineItem } from '../../../shared/data/project/subline-item';
import { LineItemDialogComponent } from '../line-item-dialog/line-item-dialog.component';
import { SubLineItemDialogComponent } from '../sub-line-item-dialog/sub-line-item-dialog.component';
import { SharedService } from '../../../shared.service';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-line-items',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FeathericonComponent,
    RouterModule,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: './line-items.component.html',
  styleUrls: ['./line-items.component.scss'],
})
export class LineItemsComponent implements OnInit {
  projectId: string | null = null;
  userEmail: string = SharedService.getEmail();
  displayedColumns: string[] = [
    'lineItemName',
    'numberBids',
    'bidSelected',
    'budget',
    'subcontractorCost',
    'profitMargin',
  ];
  editedLineItem: LineItem | null = null;
  lineItems: LineItem[] = [];
  pageLineItems: number = 1;

  availableLineItems = [
    // Your available line items here...
  ].map((name) => ({
    label: name,
    value: name,
  }));

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.lineItems.push({
      id: null,
      lineItemName: '',
      budget: 0,
      subcontractorCost: 0,
      selected: false,
      editMode: false,
      subLineItem: false,
      lineItemRef: '',
      subLineItems: [],
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    if (this.projectId) {
      this.loadLineItems();
    } else {
      this.openSnackBar('Project ID is missing!', 'Close', 3000);
      this.router.navigate(['/projects']);
    }
  }

  loadLineItems(): void {
    if (this.userEmail && this.projectId) {
      this.apiService.getLineItems(this.userEmail, this.projectId).subscribe(
        (lineItems: LineItem[]) => {
          this.lineItems = lineItems;
        },
        (error: any) => {
          this.openSnackBar('Error fetching line items.', 'Close', 3000);
          console.error('Error fetching line items:', error);
        }
      );
    } else {
      console.error('User email or project ID is missing');
    }
  }

  addNewLineItem(): void {
    const newLineItem: LineItem = {
      id: null,
      lineItemName: '',
      budget: 0,
      subcontractorCost: 0,
      selected: false,
      editMode: false,
      subLineItem: false,
      subLineItems: [], // Initialize subLineItems
      lineItemRef: this.generateSubLineItemId(),
    };

    this.lineItems.push(newLineItem);
  }

  generateSubLineItemId(): string {
    return `sublineitem-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  addSubLineItem(
    lineItemId: string,
    newSubLineItemData: { lineItemName: string }
  ): void {
    const lineItem = this.lineItems.find((item) => item.id === lineItemId);

    if (lineItem) {
      const newSubLineItem: SubLineItem = {
        id: this.generateSubLineItemId(),
        lineItemName: newSubLineItemData.lineItemName,
        budget: 0,
      };

      // Initialize 'subLineItems' if undefined
      if (!lineItem.subLineItems) {
        lineItem.subLineItems = [];
      }

      lineItem.subLineItems.push(newSubLineItem);
      console.log('Sub-Line Item added:', newSubLineItem);
    } else {
      console.error('Line Item not found:', lineItemId);
    }
  }

  originalItems: { [key: string]: LineItem } = {};
  originalSublineItems: { [key: string]: SubLineItem } = {};

  onToggleEditMode(item: LineItem): void {
    if (!item.editMode) {
      this.originalItems[item.id || ''] = { ...item }; // Store the original item
    }
    item.editMode = !item.editMode;
  }

  onToggleSublineItemEditMode(subItem: SubLineItem): void {
    subItem.editMode = !subItem.editMode;
  }

  onSaveLineItem(item: LineItem): void {
    if (
      item &&
      item.lineItemName &&
      item.budget > 0 &&
      item.subcontractorCost !== undefined
    ) {
      console.log('Saving item:', item);
      if (item && this.projectId && this.userEmail && item.id) {
        this.apiService
          .updateLineItem(this.userEmail, this.projectId, item.id, item)
          .subscribe(
            () => {
              this.loadLineItems();
              item.editMode = false;
            },
            (error) => {
              console.error('Error saving line item:', error);
              this.openSnackBar('Error updating line item.', 'Close', 3000);
            }
          );
      } else {
        console.error(
          'Cannot save line item: projectId, userEmail, or item.id is not defined'
        );
      }
    }
  }

  confirmRemoveLineItem(item: LineItem): void {
    if (confirm(`Are you sure you want to remove "${item.lineItemName}"?`)) {
      this.removeLineItem(item);
    }
  }

  private removeLineItem(item: LineItem): void {
    if (!this.userEmail || !this.projectId || !item.id) {
      alert('Cannot remove line item. Required information is missing.');
      return;
    }

    this.apiService
      .deleteLineItem(this.userEmail, this.projectId, item.id)
      .subscribe(
        () => {
          this.lineItems = this.lineItems.filter((i) => i.id !== item.id);
          console.log('Removed line item:', item);
        },
        (error) => {
          console.error('Error removing line item:', error);
          alert('There was an error removing the line item. Please try again.');
        }
      );
  }

  confirmRemoveSublineItem(item: SubLineItem): void {
    if (confirm(`Are you sure you want to remove "${item.lineItemName}"?`)) {
      this.removeSublineItem(item);
    }
  }

  private removeSublineItem(item: SubLineItem): void {
    if (!this.userEmail || !this.projectId || !item.id) {
      alert('Cannot remove subline item. Required information is missing.');
      return;
    }

    this.apiService
      .deleteSublineItem(this.userEmail, this.projectId, item.id)
      .subscribe(
        () => {
          const lineItem = this.lineItems.find((li) =>
            li.subLineItems?.some((si) => si.id === item.id)
          );
          if (lineItem && lineItem.subLineItems) {
            lineItem.subLineItems = lineItem.subLineItems.filter(
              (si) => si.id !== item.id
            );
          }
          console.log('Removed subline item:', item);
        },
        (error) => {
          console.error('Error removing subline item:', error);
          alert(
            'There was an error removing the subline item. Please try again.'
          );
        }
      );
  }

  onCancelEditMode(item: LineItem): void {
    item.editMode = false;
    const originalItem = this.originalItems[item.id || ''];
    if (originalItem) {
      Object.assign(item, originalItem);
      delete this.originalItems[item.id || ''];
    }
  }

  onCancelSublineItemEditMode(item: SubLineItem): void {
    item.editMode = false;
    const originalItem = this.originalItems[item.id || ''];
    if (originalItem) {
      Object.assign(item, originalItem);
      delete this.originalItems[item.id || ''];
    }
  }

  calculateProfitMargin(lineItem: LineItem): number {
    const budget = lineItem.budget ?? 0;
    const subcontractorCost = lineItem.subcontractorCost ?? 0;
    return budget - subcontractorCost;
  }

  calculateSublineItemProfitMargin(lineItem: SubLineItem): number {
    const budget = lineItem.budget ?? 0;
    const subcontractorCost = lineItem.subcontractorCost ?? 0;
    return budget - subcontractorCost;
  }

  openSnackBar(message: string, action: string, duration: number = 2000): void {
    this.snackBar.open(message, action, { duration });
  }

  openDialog(projectId: string): void {
    const dialogRef = this.dialog.open(LineItemDialogComponent, {
      width: '400px',
      data: { projectId: projectId, userEmail: this.userEmail },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadLineItems();
      }
    });
  }

  selectedLineItem: LineItem; // Declare the variable at the class level

  onLineItemSelect(lineItem: LineItem): void {
    this.selectedLineItem = lineItem; // Capture the selected line item
  }

  openSubLineItemDialog(lineItem: LineItem): void {
    // Ensure selectedLineItem is assigned before opening the dialog
    this.selectedLineItem = lineItem; // Capture the currently selected line item

    const dialogRef = this.dialog.open(SubLineItemDialogComponent, {
      width: '400px',
      data: {
        projectId: this.projectId,
        parentLineItemId: lineItem.id,
        lineItemRef: this.selectedLineItem.id, // Use 'this.selectedLineItem'
        userEmail: this.userEmail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && typeof result === 'object') {
        // Initialize 'subLineItems' if undefined
        if (!lineItem.subLineItems) {
          lineItem.subLineItems = [];
        }

        // Ensure result has necessary properties before pushing
        if (result.lineItemName && result.budget !== undefined) {
          const newSubLineItem: SubLineItem = {
            id: this.generateSubLineItemId(),
            lineItemName: result.lineItemName, // Corrected name
            budget: result.budget || 0,
          };

          // Push the new sub-line item into the array
          lineItem.subLineItems.push(newSubLineItem);
          console.log('Sub-line item added:', newSubLineItem);
        } else {
          console.error('Invalid sub-line item data:', result);
        }
      }
    });
  }
}
