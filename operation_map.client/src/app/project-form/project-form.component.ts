import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  projectId: string | null;

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
      startDate: ['', Validators.required],
      started: [false],
      finished: [false],
      finishDate: [''],
      completionPercentage: [0],
      units: [0],
      projectEmail: [''],
      projectStatus: [''],
      bathrooms: [0],
      squareFootage: [0],
      bedrooms: [0]
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
        this.apiService.updateProject(this.projectId, this.projectForm.value).subscribe(() => {
          this.router.navigate(['/projects']);
        });
      } else {
        this.apiService.createProject(this.projectForm.value).subscribe(() => {
          this.router.navigate(['/projects']);
        });
      }
    }
  }

  onDelete(): void {
    if (this.projectId) {
      this.apiService.deleteProject(this.projectId).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
