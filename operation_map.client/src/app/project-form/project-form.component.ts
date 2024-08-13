import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Project } from '../models/project.model';
import { SharedService } from '../shared.service'
import { LineItemOption } from '../models/line-item-option.model';
import { MatDialog } from '@angular/material/dialog';
import { BudgetDialogComponent } from '../budget-dialog/budget-dialog.component';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  isLoading = false;
  projectForm: FormGroup;
  projectId: string | null;
  email: string = SharedService.getEmail();
  redirect: string | null | undefined;
  projectStatus: number | undefined;
  defaultLineItems = [
    { name: 'Clearing', selected: true, budget: 0 },
    { name: 'Demolition', selected: true, budget: 0 },
    { name: 'Excavation', selected: true, budget: 0 },
    { name: 'Foundation', selected: true, budget: 0 },
    { name: 'Drainage', selected: true, budget: 0 },
    { name: 'Electrical Underground', selected: true, budget: 0 },
    { name: 'Water Line Connection', selected: true, budget: 0 },
    { name: 'Side Sewer Connection', selected: true, budget: 0 },
    { name: 'Framing', selected: true, budget: 0 },
    { name: 'Roofing', selected: true, budget: 0 },
    { name: 'Windows', selected: true, budget: 0 },
    { name: 'Decking', selected: true, budget: 0 },
    { name: 'Garage Door', selected: true, budget: 0 },
    { name: 'Gutters', selected: true, budget: 0 },
    { name: 'Flashing', selected: true, budget: 0 },
    { name: 'Waterproofing', selected: true, budget: 0 },
    { name: 'Siding', selected: true, budget: 0 },
    { name: 'Concrete Flat Work', selected: true, budget: 0 },
    { name: 'Painting Outside', selected: true, budget: 0 },
    { name: 'Painting Inside', selected: true, budget: 0 },
    { name: 'Electrical', selected: true, budget: 0 },
    { name: 'Plumbing', selected: true, budget: 0 },
    { name: 'Heating / AC', selected: true, budget: 0 },
    { name: 'Fire Sprinkler', selected: true, budget: 0 },
    { name: 'Low voltage', selected: true, budget: 0 },
    { name: 'Insulation', selected: true, budget: 0 },
    { name: 'Drywall', selected: true, budget: 0 },
    { name: 'Hardwood Flooring', selected: true, budget: 0 },
    { name: 'Carpet', selected: true, budget: 0 },
    { name: 'Tile', selected: true, budget: 0 },
    { name: 'Outside Stone/tile', selected: true, budget: 0 },
    { name: 'Kitchen Cabinet Install', selected: true, budget: 0 },
    { name: 'Countertop Install', selected: true, budget: 0 },
    { name: 'Hardware Install', selected: true, budget: 0 },
    { name: 'Mirrors', selected: true, budget: 0 },
    { name: 'Shower Glass Door', selected: true, budget: 0 },
    { name: 'Closet Install', selected: true, budget: 0 },
    { name: 'Millwork Doors and Trim', selected: true, budget: 0 },
    { name: 'Grading', selected: true, budget: 0 },
    { name: 'Landscaping', selected: true, budget: 0 },
    { name: 'Fencing', selected: true, budget: 0 },
    { name: 'Driveway Paving', selected: true, budget: 0 },
    { name: 'Driveway Concrete', selected: true, budget: 0 },
    { name: 'Cleaning', selected: true, budget: 0 },
    { name: 'Tool / Equipment Rental', selected: true, budget: 0 },
    { name: 'Day Labor Help', selected: true, budget: 0 }
  ];

  newLineItem: string = '';
  selectedItems: LineItemOption[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
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
      bedrooms: [0]
    });


    const projectStatusControl = this.projectForm.get('projectStatus');
    projectStatusControl?.valueChanges.subscribe(value => {
      if (value !== null && value !== undefined) {
        this.projectForm.patchValue({ projectStatus: Number(value) }, { emitEvent: false });
      }
    });

    this.projectId = null;
  }


  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.redirect = this.route.snapshot.paramMap.get('redirect');
    this.projectStatus = Number(this.route.snapshot.paramMap.get('status'));
    if (this.projectId) {
      this.apiService.getProjectById(this.email, this.projectId).subscribe((project) => {
        if (project) {
          this.projectForm.patchValue(project);
        } else {
          this.projectForm.patchValue({ projectStatus: this.projectStatus })
        }
      });
    }
  }


  onSubmit(): void {
    if (this.projectForm.valid) {
      const selectedLineItems = this.defaultLineItems.filter(item => item.selected);

      // Open the budget dialog
      const dialogRef = this.dialog.open(BudgetDialogComponent, {
        width: '500px',
        data: { items: selectedLineItems }
      });

      // Handle the dialog close event
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // result contains the selected items with their budgets
          const formData = {
            ...this.projectForm.value,
            lineItemOptions: result
          }
          if (this.projectId) {
            this.isLoading = true;
            this.apiService.updateProject(this.email, this.projectId, formData).subscribe(() => {
              if (this.redirect && this.redirect == 'projects-bidding') {
                this.router.navigate(['/projects-bidding']);
                this.isLoading = false;
              } else {
                this.router.navigate(['/projects']);
                this.isLoading = false;
              }
            });
          } else {
            this.isLoading = true;
            this.apiService.createProject(this.email, formData).subscribe(() => {
              if (this.redirect && this.redirect == 'projects-bidding') {
                this.router.navigate(['/projects-bidding']);
                this.isLoading = false;
              } else {
                this.router.navigate(['/projects']);
                this.isLoading = false;
              }
            });
          }
        }
        })
      }
      else {
        this.alertInvalidForm();
        console.log('Form is invalid');
      }
    }


  onArchive(): void {
    if (this.projectId) {
      this.apiService.updateProjectStatus(this.email, this.projectId, -1).subscribe(() => {
        this.router.navigate(['/projects-archive']);
      });
    }
  }

  onCheckboxChange(event: any, item: { name: string, selected: boolean }) {
    console.log('Target', event)
    item.selected = event.checked;
  }

  addNewItem() {
    if (this.newLineItem.trim()) {
      this.defaultLineItems.push({ name: this.newLineItem.trim(), selected: true, budget: 0 });
      this.newLineItem = '';
      this.cdr.detectChanges();
    }
  }

  selectAll() {
    this.defaultLineItems.forEach(item => item.selected = true);
  }

  clearAll() {
    this.defaultLineItems.forEach(item => item.selected = false);
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
}
