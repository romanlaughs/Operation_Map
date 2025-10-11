import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Supplier } from '../models/supplier.model';
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];
  userEmail: string = SharedService.getEmail();
  selectedSuppliers: Set<string> = new Set();

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: ApiService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getSuppliers()
  }

  getSuppliers() {
    this.supplierService.getSuppliers(this.userEmail).subscribe(
      (suppliers) => {
        this.suppliers = suppliers;
        console.log('Suppliers set:', this.suppliers);
        this.cd.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching suppliers:', error);
      }
    );
  }

  addSupplier() {
    this.router.navigate(['/supplier-form', { userEmail: this.userEmail }]);
  }

  editSupplier(supplierId: string) {
    this.router.navigate(['/supplier-form', { userEmail: this.userEmail, id: supplierId }]);
  }

  deleteSupplier(supplierId: string) {
    this.supplierService.deleteSupplier(this.userEmail, supplierId).subscribe(
      () => {
        this.suppliers = this.suppliers.filter(s => s.id !== supplierId);
      },
      (error) => {
        console.error('Error deleting supplier:', error);
      }
    );
  }

  bulkDeleteSuppliers() {
    const supplierIds = Array.from(this.selectedSuppliers);
    this.supplierService.bulkDeleteSuppliers(this.userEmail, supplierIds).subscribe(
      () => {
        this.suppliers = this.suppliers.filter(s => !this.selectedSuppliers.has(s.id!));
        this.selectedSuppliers.clear();
      },
      (error) => {
        console.error('Error bulk deleting suppliers:', error);
      }
    );
  }

  toggleSupplierSelection(supplierId: string) {
    if (this.selectedSuppliers.has(supplierId)) {
      this.selectedSuppliers.delete(supplierId);
    } else {
      this.selectedSuppliers.add(supplierId);
    }
  }

  addToGroup() {
    // Implement adding selected suppliers to a group
  }
}
