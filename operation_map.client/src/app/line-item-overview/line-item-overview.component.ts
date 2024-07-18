import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service'; // Adjust the import path as necessary
import { Subcontractor } from '../models/subcontractor.model'; // Adjust the import path as necessary
import { Invoice } from '../models/invoice.model'; // Adjust the import path as necessary
import { SubcontractorDialogComponent } from '../subcontractor-dialog/subcontractor-dialog.component'; // Adjust the import path as necessary
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component'; // Adjust the import path as necessary
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-line-item-overview',
  templateUrl: './line-item-overview.component.html',
  styleUrls: ['./line-item-overview.component.css']
})
export class LineItemOverviewComponent implements OnInit {
  userEmail: string = SharedService.getEmail();
  projectId: string = SharedService.getProjectId();
  lineItemId: string = '';
  lineItem: any; // Define the type as needed
  subcontractors: Subcontractor[] = [];
  invoices: Invoice[] = [];

  subcontractorColumns: string[] = ['name', 'bidDate', 'startDate', 'endDate', 'bidPrice', 'actions'];
  invoiceColumns: string[] = ['date', 'amount', 'notes', 'actions'];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.lineItemId = this.route.snapshot.params['id'];
    console.log("LineItemID", this.lineItemId)
    SharedService.setLineItemId(this.lineItemId);
    this.loadLineItem();
  }

  loadLineItem(): void {
    this.apiService.getLineItemById(this.userEmail, this.projectId, this.lineItemId).subscribe((data) => {
      if (data) {
        this.lineItem = data;
        if (data.subcontractors)
          this.subcontractors = data.subcontractors;
        console.log("Subcontractors", this.subcontractors); // Adjust based on your API response structure
        if (data.invoices)
          this.invoices = data.invoices; // Adjust based on your API response structure
      }
    });
  }

  openSubcontractorDialog(): void {
    const dialogRef = this.dialog.open(SubcontractorDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLineItem();
      }
    });
  }

  openInvoiceDialog(): void {
    const dialogRef = this.dialog.open(InvoiceDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLineItem();
      }
    });
  }

  editSubcontractor(subcontractor: Subcontractor): void {
    const dialogRef = this.dialog.open(SubcontractorDialogComponent, {
      width: '400px',
      data: subcontractor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLineItem();
      }
    });
  }

  deleteSubcontractor(subcontractor: Subcontractor): void {
    this.apiService.deleteLineItemSubs(this.userEmail, this.projectId, this.lineItemId, subcontractor).subscribe(() => {
      this.loadLineItem();
    });
  }

  editInvoice(invoice: Invoice): void {
    const dialogRef = this.dialog.open(InvoiceDialogComponent, {
      width: '400px',
      data: invoice
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLineItem();
      }
    });
  }

  deleteInvoice(invoice: Invoice): void {
    const index = this.invoices.findIndex(i => i.id === invoice.id);
    if (index !== -1) {
      this.invoices.splice(index, 1);
    }
  }
}
