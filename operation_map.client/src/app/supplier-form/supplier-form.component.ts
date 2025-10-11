import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Supplier } from '../models/supplier.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm: FormGroup;
  supplierId: string | null;
  email: string = SharedService.getEmail();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.supplierForm = this.fb.group({
      companyName: ['', Validators.required],
      salespersonName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['']
    });

    this.supplierId = null;
  }

  ngOnInit(): void {
    this.supplierId = this.route.snapshot.paramMap.get('id');
    if (this.supplierId) {
      this.apiService.getSupplierById(this.email, this.supplierId).subscribe((supplier) => {
        if (supplier) {
          this.supplierForm.patchValue(supplier);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      if (this.supplierId) {
        this.apiService.updateSupplier(this.email, this.supplierId, this.supplierForm.value).subscribe(() => {
          this.router.navigate(['/suppliers']);
        });
      } else {
        this.apiService.createSupplier(this.email, this.supplierForm.value).subscribe(() => {
          this.router.navigate(['/suppliers']);
        });
      }
    } else {
      this.alertInvalidForm();
      console.log('Form is invalid');
    }
  }

  alertInvalidForm() {
    const invalidControls = [];
    const controls = this.supplierForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    alert(`The following fields are required: ${invalidControls.join(', ')}`);
  }
}
