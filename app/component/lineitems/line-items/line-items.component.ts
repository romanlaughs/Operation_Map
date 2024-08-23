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

@Component({
  selector: 'app-line-item',
  standalone: true,
  imports: [CommonModule, MatTableModule, FeathericonComponent, RouterModule],
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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
  }

  ngOnInit(): void {
    this.loadLineItems();
  }

  loadLineItems(): void {
    this.apiService.getLineItems(this.userEmail, this.projectId).subscribe(
      (lineItems) => {
        this.lineItems = lineItems;
      },
      (error: any) => {
        console.error('Error fetching line items:', error);
      }
    );
  }

  calculateProfitMargin(lineItem: LineItem): number {
    return (lineItem.budget ?? 0) - (lineItem.subcontractorCost ?? 0);
  }

  openDialog(projectId: string): void {
    const dialogRef = this.dialog.open(LineItemDialogComponent, {
      data: { projectId: this.projectId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.loadLineItems();
      }
    });
  }
}
