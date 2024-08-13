import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service'; // Adjust the import path
import { Subcontractor } from '../models/subcontractor.model'; // Adjust the import path
import { SharedService } from '../shared.service'

@Component({
  selector: 'app-subcontractors',
  templateUrl: './subcontractors.component.html',
  styleUrls: ['./subcontractors.component.css']
})
export class SubcontractorsComponent implements OnInit {
  subcontractors: Subcontractor[] = [];
  userEmail: string = SharedService.getEmail();
  selectedSubcontractors: Set<string> = new Set();
  projectId: string = '';
  bidNumber: string[] = [];


  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private subcontractorService: ApiService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getSubcontractors()
  }

  getSubcontractors() {
    this.subcontractorService.getSubcontractors(this.userEmail).subscribe(
      (subcontractors) => {
        this.subcontractors = subcontractors;
        console.log('Subcontractors set:', this.subcontractors); // Debug log
        this.cd.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching subcontractors:', error);
      }
    );
  }

  addSubcontractor() {
    this.router.navigate(['/subcontractor-form', { userEmail: this.userEmail }]);
  }

  editSubcontractor(subcontractorId: string) {
    this.router.navigate(['/subcontractor-form', { userEmail: this.userEmail, id: subcontractorId }]);
  }

  deleteSubcontractor(subcontractorId: string) {
    this.subcontractorService.deleteSubcontractor(this.userEmail, subcontractorId).subscribe(
      () => {
        this.subcontractors = this.subcontractors.filter(s => s.id !== subcontractorId);
      },
      (error) => {
        console.error('Error deleting subcontractor:', error);
      }
    );
  }

  bulkDeleteSubcontractors() {
    const subcontractorIds = Array.from(this.selectedSubcontractors);
    this.subcontractorService.bulkDeleteSubcontractors(this.userEmail, subcontractorIds).subscribe(
      () => {
        this.subcontractors = this.subcontractors.filter(s => !this.selectedSubcontractors.has(s.id!));
        this.selectedSubcontractors.clear();
      },
      (error) => {
        console.error('Error bulk deleting subcontractors:', error);
      }
    );
  }

  toggleSubcontractorSelection(subcontractorId: string) {
    if (this.selectedSubcontractors.has(subcontractorId)) {
      this.selectedSubcontractors.delete(subcontractorId);
    } else {
      this.selectedSubcontractors.add(subcontractorId);
    }
  }

  addToGroup() {
    // Implement adding selected subcontractors to a group
  }
}
