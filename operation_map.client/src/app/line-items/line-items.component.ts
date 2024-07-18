import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service'; // Adjust the import path
import { LineItem } from '../models/lineitem.model';
import { SharedService } from '../shared.service';
import { LineItemDialogComponent } from '../line-item-dialog/line-item-dialog.component';
import { Project } from '../models/project.model';
import { LineItemOption } from '../models/line-item-option.model';

@Component({
  selector: 'app-line-items',
  templateUrl: './line-items.component.html',
  styleUrls: ['./line-items.component.css']
})
export class LineItemsComponent implements OnInit {
  projectId: string;
  lineItems: LineItem[] = [];
  userEmail: string = SharedService.getEmail();
  displayedColumns: string[] = ['lineItemName', 'dateStarted', 'dateFinished', 'myBidBudget', 'subcontractorCost', 'profitMargin'];
  lineItemOptions: LineItemOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
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

  openDialog(): void {
    const dialogRef = this.dialog.open(LineItemDialogComponent, {
      width: '250px',
      data: { projectId: this.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.loadLineItems();
      }
    });
  }
}
