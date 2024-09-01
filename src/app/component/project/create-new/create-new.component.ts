import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { SharedService } from '../../../shared.service';
import { LineItemOption } from '../../../shared/data/project/line-item-options';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-create-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FeathericonComponent,
    RouterModule,
  ],
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
})
export class CreateNewComponent implements OnInit {
  projectForm: FormGroup;
  projectId: string | null;
  email: string = SharedService.getEmail();
  redirect: string | null | undefined;
  projectStatus: number | undefined;
  defaultLineItems = [
    { name: 'Clearing', selected: true },
    { name: 'Demolition', selected: true },
    { name: 'Excavation', selected: true },
    { name: 'Foundation', selected: true },
    { name: 'Drainage', selected: true },
    { name: 'Electrical Underground', selected: true },
    { name: 'Water Line Connection', selected: true },
    { name: 'Side Sewer Connection', selected: true },
    { name: 'Framing', selected: true },
    { name: 'Roofing', selected: true },
    { name: 'Windows', selected: true },
    { name: 'Decking', selected: true },
    { name: 'Garage Door', selected: true },
    { name: 'Gutters', selected: true },
    { name: 'Flashing', selected: true },
    { name: 'Waterproofing', selected: true },
    { name: 'Siding', selected: true },
    { name: 'Concrete Flat Work', selected: true },
    { name: 'Painting Outside', selected: true },
    { name: 'Painting Inside', selected: true },
    { name: 'Electrical', selected: true },
    { name: 'Plumbing', selected: true },
    { name: 'Heating / AC', selected: true },
    { name: 'Fire Sprinkler', selected: true },
    { name: 'Low voltage', selected: true },
    { name: 'Insulation', selected: true },
    { name: 'Drywall', selected: true },
    { name: 'Hardwood Flooring', selected: true },
    { name: 'Carpet', selected: true },
    { name: 'Tile', selected: true },
    { name: 'Outside Stone/tile', selected: true },
    { name: 'Kitchen Cabinet Install', selected: true },
    { name: 'Countertop Install', selected: true },
    { name: 'Hardware Install', selected: true },
    { name: 'Mirrors', selected: true },
    { name: 'Shower Glass Door', selected: true },
    { name: 'Closet Install', selected: true },
    { name: 'Millwork Doors and Trim', selected: true },
    { name: 'Grading', selected: true },
    { name: 'Landscaping', selected: true },
    { name: 'Fencing', selected: true },
    { name: 'Driveway Paving', selected: true },
    { name: 'Driveway Concrete', selected: true },
    { name: 'Cleaning', selected: true },
    { name: 'Tool / Equipment Rental', selected: true },
    { name: 'Day Labor Help', selected: true },
  ];

  newLineItem: string = '';
  selectedItems: LineItemOption[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      startDate: [new Date()],
      started: [false],
      finished: [false],
      finishDate: [new Date()],
      completionPercentage: [0],
      units: [0],
      projectEmail: [''],
      projectStatus: [0, Validators.required],
      bathrooms: [0],
      squareFootage: [0],
      bedrooms: [0],
    });

    const projectStatusControl = this.projectForm.get('projectStatus');
    projectStatusControl?.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined) {
        this.projectForm.patchValue(
          { projectStatus: Number(value) },
          { emitEvent: false }
        );
      }
    });

    this.projectId = null;
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.redirect = this.route.snapshot.paramMap.get('redirect');
    this.projectStatus = Number(this.route.snapshot.paramMap.get('status'));
    if (this.projectId) {
      this.apiService
        .getProjectById(this.email, this.projectId)
        .subscribe((project) => {
          if (project) {
            this.projectForm.patchValue(project);
          } else {
            this.projectForm.patchValue({ projectStatus: this.projectStatus });
          }
        });
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const selectedLineItems = this.defaultLineItems.filter(
        (item) => item.selected
      );
      const formData = {
        ...this.projectForm.value,
        lineItemOptions: selectedLineItems,
      };
      if (this.projectId) {
        this.apiService
          .updateProject(this.email, this.projectId, formData)
          .subscribe(() => {
            if (this.redirect && this.redirect == '/project/list') {
              this.router.navigate(['/project/bids']);
            } else {
              this.router.navigate(['/project/list']);
            }
          });
      } else {
        this.apiService.createProject(this.email, formData).subscribe(() => {
          console.log('Creation Completed');
          this.router.navigate(['/project/bids']);
        });
      }
    } else {
      this.alertInvalidForm();
      console.log('Form is invalid');
    }
  }

  onCheckboxChange(event: any, item: { name: string; selected: boolean }) {
    console.log('Target', event);
    item.selected = event.checked;
  }

  selectAll() {
    this.defaultLineItems.forEach((item) => (item.selected = true));
  }

  clearAll() {
    this.defaultLineItems.forEach((item) => (item.selected = false));
  }

  alertInvalidForm() {
    const invalidControls = [];
    const controls = this.projectForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    alert(`The following fields are required: ${invalidControls.join(', ')}`);
  }

  // Function to track items by their unique ID
  trackByFn(index: number, item: any): number {
    return item.id; // or use 'index' if you don't have a unique ID in each item
  }
}
