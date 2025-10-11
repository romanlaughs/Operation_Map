import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AccountingMaterial, Payment } from '../models/accounting-material.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent implements OnInit {
  materialForm: FormGroup;
  materialId: string | null;
  projectId: string = '';
  email: string = SharedService.getEmail();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.materialForm = this.fb.group({
      materialType: ['', Validators.required],
      supplierOrStore: ['', Validators.required],
      itemNumber: [''],
      datePurchased: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      additionalOrder: [0, Validators.min(0)],
      payments: this.fb.array([])
    });

    this.materialId = null;
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId') || '';
    this.materialId = this.route.snapshot.paramMap.get('id');
    
    if (this.materialId && this.projectId) {
      this.apiService.getAccountingMaterialById(this.email, this.projectId, this.materialId).subscribe((material) => {
        if (material) {
          this.materialForm.patchValue({
            materialType: material.materialType,
            supplierOrStore: material.supplierOrStore,
            itemNumber: material.itemNumber,
            datePurchased: material.datePurchased,
            price: material.price,
            additionalOrder: material.additionalOrder
          });
          
          // Load payments
          if (material.payments) {
            material.payments.forEach(payment => {
              this.addPayment(payment);
            });
          }
        }
      });
    }
  }

  get payments(): FormArray {
    return this.materialForm.get('payments') as FormArray;
  }

  addPayment(payment?: Payment): void {
    const paymentGroup = this.fb.group({
      id: [payment?.id || ''],
      description: [payment?.description || '', Validators.required],
      amount: [payment?.amount || 0, [Validators.required, Validators.min(0)]],
      datePaid: [payment?.datePaid || ''],
      invoiceURL: [payment?.invoiceURL || '']
    });
    this.payments.push(paymentGroup);
  }

  removePayment(index: number): void {
    this.payments.removeAt(index);
  }

  onSubmit(): void {
    if (this.materialForm.valid) {
      const materialData = this.materialForm.value;
      
      if (this.materialId) {
        this.apiService.updateAccountingMaterial(this.email, this.projectId, this.materialId, materialData).subscribe(() => {
          this.router.navigate(['/materials', { projectId: this.projectId }]);
        });
      } else {
        this.apiService.createAccountingMaterial(this.email, this.projectId, materialData).subscribe(() => {
          this.router.navigate(['/materials', { projectId: this.projectId }]);
        });
      }
    } else {
      this.alertInvalidForm();
      console.log('Form is invalid');
    }
  }

  alertInvalidForm() {
    const invalidControls = [];
    const controls = this.materialForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    alert(`The following fields are required or invalid: ${invalidControls.join(', ')}`);
  }
}
