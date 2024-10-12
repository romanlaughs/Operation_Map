import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { SharedService } from '../../../shared.service';
import { LineItem } from '../../../shared/data/project/line-item';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-create-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    FeathericonComponent,
    RouterModule,
  ],
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
})
export class CreateNewComponent implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 4;
  projectForm: FormGroup;
  lineItemsForm: FormGroup;
  projectId: string | null;
  email: string = SharedService.getEmail();
  redirect: string | null | undefined;
  projectStatus: number | undefined;
  isEditMode: boolean = false;
  // Default line items for new projects
  defaultLineItems = [
    'Clearing',
    'Demolition',
    'Excavation',
    'Foundation',
    'Drainage',
    'Electrical Underground',
    'Water Line Connection',
    'Side Sewer Connection',
    'Framing',
    'Roofing',
    'Windows',
    'Decking',
    'Garage Door',
    'Gutters',
    'Flashing',
    'Waterproofing',
    'Siding',
    'Concrete Flat Work',
    'Painting Outside',
    'Painting Inside',
    'Electrical',
    'Plumbing',
    'Heating / AC',
    'Fire Sprinkler',
    'Low voltage',
    'Insulation',
    'Drywall',
    'Hardwood Flooring',
    'Carpet',
    'Tile',
    'Outside Stone/tile',
    'Kitchen Cabinet Install',
    'Countertop Install',
    'Hardware Install',
    'Mirrors',
    'Shower Glass Door',
    'Closet Install',
    'Millwork Doors and Trim',
    'Grading',
    'Landscaping',
    'Fencing',
    'Driveway Paving',
    'Driveway Concrete',
    'Cleaning',
    'Tool / Equipment Rental',
    'Day Labor Help',
  ].map((name) => ({
    lineItemName: name,
    selected: false,
    showAdditionalFields: false,
    budget: '',
    notes: '',
  }));

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectId = null;
    this.initializeForms();
  }

  // Initialize forms
  private initializeForms() {
    this.initializeProjectForm();
    this.initializeLineItemsForm();
  }

  // Project form initialization
  private initializeProjectForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      startDate: [new Date()],
      started: [false],
      finished: [false],
      finishDate: [new Date()],
      completionPercentage: [0],
      units: [0, Validators.required],
      projectEmail: ['', [Validators.required, Validators.email]],
      projectStatus: [0, Validators.required],
      bathrooms: [0, Validators.required],
      squareFootage: [0],
      bedrooms: [0, Validators.required],
      projectDescription: [''],
    });

    // Watch for changes in project status
    this.projectForm.get('projectStatus')?.valueChanges.subscribe((value) => {
      if (value !== null && value !== undefined) {
        this.projectForm.patchValue(
          { projectStatus: Number(value) },
          { emitEvent: false }
        );
      }
    });
  }

  // Line items form initialization
  private initializeLineItemsForm() {
    this.lineItemsForm = this.fb.group({
      lineItems: this.fb.array([]),
      projectDescription: [''],
    });
    this.loadLineItems(); // Load default line items
  }

  // Load line items into the form
  private loadLineItems() {
    this.defaultLineItems.forEach((item) => this.addLineItem(item));
  }

  // Add a line item to the form
  private addLineItem(item: any) {
    const lineItem = this.fb.group({
      lineItemName: [item.lineItemName || ''],
      selected: [item.selected || false],
      showAdditionalFields: [item.showAdditionalFields || false],
      budget: [item.budget || ''],
      notes: [item.notes || ''],
    });

    this.lineItems.push(lineItem); // Push the new line item to the array
  }

  get lineItems(): FormArray {
    return this.lineItemsForm.get('lineItems') as FormArray; // Access line items as FormArray
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.redirect = this.route.snapshot.paramMap.get('redirect');
    this.projectStatus = Number(this.route.snapshot.paramMap.get('status'));
    this.isEditMode = !!this.projectId;

    this.totalSteps = this.isEditMode ? 2 : 3; // Adjust steps based on edit mode

    // Load existing project data if in edit mode
    if (this.isEditMode && this.projectId) {
      this.apiService
        .getProjectById(this.email, this.projectId!)
        .subscribe((project) => {
          if (project) {
            this.projectForm.patchValue(project); // Populate project form with existing data
            this.lineItems.clear(); // Clear existing line items

            // Check if project.lineItems is defined before iterating
            if (project.lineItems && Array.isArray(project.lineItems)) {
              project.lineItems.forEach((item: LineItem) =>
                this.addLineItem(item)
              ); // Add existing line items
            }
          }
        });
    }
  }

  // Access specific form control in line items
  getFormControl(index: number, controlName: string): FormControl {
    return this.lineItems.at(index).get(controlName) as FormControl;
  }

  // Handle form submission
  onSubmit(): void {
    if (this.projectForm.valid && this.lineItemsForm.valid) {
      const selectedLineItems = this.lineItems.controls
        .map((control) => control.value)
        .filter((item) => item.selected); // Filter selected line items

      const formData = {
        ...this.projectForm.value,
        lineItems: selectedLineItems,
      };

      if (this.projectId) {
        this.apiService
          .updateProject(this.email, this.projectId!, formData)
          .subscribe(() => {
            this.navigateAfterSubmit(); // Navigate after successful update
          });
      } else {
        this.apiService.createProject(this.email, formData).subscribe(() => {
          this.navigateAfterSubmit(); // Navigate after successful creation
        });
      }
    }
  }

  navigateAfterSubmit(): void {
    this.router.navigate(['/project/list']);
  }

  selectAll(): void {
    this.lineItems.controls.forEach((control) =>
      control.patchValue({ selected: true })
    );
  }

  clearAll(): void {
    this.lineItems.controls.forEach((control) =>
      control.patchValue({ selected: false })
    );
  }

  trackByFn(index: number, item: any): string {
    return item.id;
  }

  onCheckboxChange(event: any, index: number): void {
    const control = this.lineItems.at(index);
    if (control) {
      control.patchValue({ showAdditionalFields: event.target.checked });
    }
  }

  goToNextStep(): void {
    if (!this.isEditMode && this.currentStep < this.totalSteps) {
      this.currentStep++;
    } else if (this.isEditMode && this.currentStep < this.totalSteps) {
      // Skip Step 2 (Line Items) in edit mode
      this.currentStep++;
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  get progress() {
    return (this.currentStep / this.totalSteps) * 100;
  }

  alertInvalidForm(): void {
    alert('Please fill in all required fields');
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
