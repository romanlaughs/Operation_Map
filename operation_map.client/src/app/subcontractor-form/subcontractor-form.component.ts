import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Subcontractor } from '../models/subcontractor.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-subcontractor-form',
  templateUrl: './subcontractor-form.component.html',
  styleUrls: ['./subcontractor-form.component.css']
})
export class SubcontractorFormComponent implements OnInit {
  subcontractorForm: FormGroup;
  subcontractorId: string | null;
  email: string = SharedService.getEmail();
  fromLineItemOverview: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subcontractorForm = this.fb.group({
      companyName: ['', Validators.required],
      contactName: ['', Validators.required],
      pdfUpload: [''],
      address: [''],
      contactPhoneNumber: [''],
      website: [''],
      contactEmail: ['', [Validators.required, Validators.email]],
      ubi: [''],
      license: [''],
      taxId: [''],
      other: [''],
      insuranceCompany: [''],
      insuranceAgent: [''],
      insurancePhone: [''],
      insuranceEmail: [''],
      additionalInsured: [false],
      certificatePDFURL: [''],
      additionalInsurancePDFURL: [''],
    });

    this.subcontractorId = null;
  }

  ngOnInit(): void {
    this.subcontractorId = this.route.snapshot.paramMap.get('id');
    this.fromLineItemOverview = this.route.snapshot.queryParamMap.get('from') === 'line-item-overview';
    if (this.subcontractorId) {
      this.apiService.getSubcontractorById(this.email, this.subcontractorId).subscribe((subcontractor) => {
        if (subcontractor) {
          this.subcontractorForm.patchValue(subcontractor);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.subcontractorForm.valid) {
      if (this.subcontractorId) {
        this.apiService.updateSubcontractor(this.email, this.subcontractorId, this.subcontractorForm.value).subscribe(() => {
          this.navigateAfterSubmit();
        });
      } else {
        this.apiService.createSubcontractor(this.email, this.subcontractorForm.value).subscribe(() => {
          this.navigateAfterSubmit();
        });
      }
    } else {
      this.alertInvalidForm();
      console.log('Form is invalid');
    }
  }

  navigateAfterSubmit(): void {
    if (this.fromLineItemOverview) {
      this.router.navigate(['/line-item-overview']);
    } else {
      this.router.navigate(['/subcontractors']);
    }
  }

  alertInvalidForm() {
    const invalidControls = [];
    const controls = this.subcontractorForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    alert(`The following fields are required: ${invalidControls.join(', ')}`);
  }
}
