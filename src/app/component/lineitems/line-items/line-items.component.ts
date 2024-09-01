import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../api.service';
import { LineItem } from '../../../shared/data/project/line-item';
import { LineItemOption } from '../../../shared/data/project/line-item-options';
import { LineItemDialogComponent } from '../line-item-dialog/line-item-dialog.component';
import { SharedService } from '../../../shared.service';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-line-items',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FeathericonComponent,
    RouterModule,
    NgxPaginationModule,
  ],
  templateUrl: './line-items.component.html',
  styleUrls: ['./line-items.component.scss'],
})
export class LineItemsComponent implements OnInit {
  projectId: string;
  lineItems: LineItem[] = [];
  lineItemOptions: LineItemOption[] = [];
  userEmail: string = SharedService.getEmail();
  displayedColumns: string[] = [
    'lineItemName',
    'numberBids',
    'bidSelected',
    'budget',
    'subcontractorCost',
    'profitMargin',
  ];
  pageLineItems: number = 1;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit(): void {
    this.loadLineItems();
  }

  loadLineItems(): void {
    this.apiService.getLineItems(this.userEmail, this.projectId).subscribe(
      (lineItems: LineItem[]) => {
        this.lineItems = lineItems;
      },
      (error: any) => {
        this.snackBar.open('Error fetching line items.', 'Close', {
          duration: 3000,
        });
        console.error('Error fetching line items:', error);
      }
    );
  }

  calculateProfitMargin(lineItem: LineItem): number {
    return (lineItem.budget ?? 0) - (lineItem.subcontractorCost ?? 0);
  }

  openDialog(projectId: string): void {
    const dialogRef = this.dialog.open(LineItemDialogComponent, {
      width: '400px',
      data: { projectId: projectId, userEmail: this.userEmail },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadLineItems(); // Refresh line items after dialog is closed
      }
    });
  }
}
