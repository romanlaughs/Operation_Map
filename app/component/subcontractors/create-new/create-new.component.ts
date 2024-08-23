import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Subcontractor } from '../../../shared/data/subcontractors/subcontractor';
import { SubcontractorGroup } from '../../../shared/data/subcontractors/subcontractorgroup';
import { SharedService } from '../../../shared.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import { Invoice } from '../../../shared/data/invoice/invoice';

@Component({
  selector: 'app-subcontractors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FeathericonComponent],
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
})
export class createNewSubcontractorComponent implements OnInit {
  subcontractorForm: FormGroup; // Define the form group
  subcontractorId: string | null;
  fromLineItemOverview: boolean = false;
  subcontractors: Subcontractor[] = [];
  subcontractorGroups: SubcontractorGroup[] = [];
  selectedSubcontractors: Set<string> = new Set();
  projectId: string = '';
  bidNumber: string[] = [];
  userEmail: string = SharedService.getEmail();
  selectedSubcontractor: any;
  redirect: string | null | undefined;

  // Define hasSubcontractors with string keys
  hasSubcontractors: { [key: string]: boolean } = {};

  constructor(
    private subcontractorService: ApiService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.subcontractorForm = this.fb.group({
      subcontractorId: [''],
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
  }

  ngOnInit(): void {
    this.getSubcontractorGroups();
    this.subcontractorId = this.route.snapshot.paramMap.get('id');
    this.fromLineItemOverview =
      this.route.snapshot.queryParamMap.get('from') === 'line-item-overview';
    if (this.subcontractorId) {
      this.subcontractorService
        .getSubcontractorById(this.userEmail, this.subcontractorId)
        .subscribe((subcontractor) => {
          if (subcontractor) {
            this.subcontractorForm.patchValue(subcontractor);
          }
        });
    }
  }

  onSubmit(): void {
    if (this.subcontractorForm.valid) {
      if (this.subcontractorId) {
        // Update the existing subcontractor
        this.subcontractorService
          .updateSubcontractor(
            this.userEmail,
            this.subcontractorId,
            this.subcontractorForm.value
          )
          .subscribe(() => {
            this.navigateAfterSubmit();
          });
      } else {
        // Create a new subcontractor
        this.subcontractorService
          .createSubcontractor(this.userEmail, this.subcontractorForm.value)
          .subscribe(() => {
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
      this.router.navigate(['/subcontractors/list']);
    } else {
      this.router.navigate(['/subcontractors/list']);
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

  getSubcontractorGroups() {
    this.subcontractorService.getSubcontractorGroups(this.userEmail).subscribe(
      (groups: SubcontractorGroup[]) => {
        this.subcontractorGroups = groups;
      },
      (error: any) => {
        console.error('Error fetching subcontractor groups:', error);
      }
    );
  }

  addToGroup() {
    const subcontractorIds = Array.from(this.selectedSubcontractors);
    if (subcontractorIds.length === 0) {
      console.error('No subcontractors selected.');
      return;
    }
  }

  goToContractorList(): void {
    this.router.navigate(['/subcontractors/list']);
  }
}
