import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Project } from '../models/project.model';
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  projectId: string | null;
  email: string = SharedService.getEmail();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
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
    if (this.projectId) {
      this.apiService.getProject(this.projectId).subscribe((project) => {
        this.projectForm.patchValue(project);
      });
    }
  }


  onSubmit(): void {
    if (this.projectForm.valid) {
      if (this.projectId) {
        this.apiService.updateProject(this.email, this.projectId, this.projectForm.value).subscribe(() => {
          console.log('Update Completed');
          this.router.navigate(['/projects']);
        });
      } else {
        this.apiService.createProject(this.email, this.projectForm.value).subscribe(() => {
          console.log('Creation Completed');
          this.router.navigate(['/projects']);
        });
      }
    }
    else
    {
      this.alertInvalidForm();
      console.log('Form is invalid');
    }
  }

/*  onSubmit() {
    if (this.projectForm.valid) {
      // Handle form submission
      console.log('Form submitted', this.projectForm.value);
    } else {
      console.log('Form is invalid');
    }
  }*/

  onDelete(): void {
    if (this.projectId) {
      this.apiService.deleteProject(this.projectId).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
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
