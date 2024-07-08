import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service'; // Adjust the import path
import { Subcontractor } from '../models/subcontractor.model'; // Adjust the import path
import { SubcontractorGroup } from '../models/subcontractorgroup.model';
import { SharedService } from '../shared.service'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddGroupDialogComponent } from '../add-group-dialog/add-group-dialog.component';


@Component({
  selector: 'app-subcontractors',
  templateUrl: './subcontractors.component.html',
  styleUrls: ['./subcontractors.component.css']
})
export class SubcontractorsComponent implements OnInit {
  subcontractors: Subcontractor[] = [];
  userEmail: string = SharedService.getEmail();
  selectedSubcontractors: Set<string> = new Set();
  subcontractorGroups: SubcontractorGroup[] = [];
  projectId: string = '';
  bidNumber: string[] = [];


  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private subcontractorService: ApiService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSubcontractors()
    this.getSubcontractorGroups();
  }

  getSubcontractors() {
    this.subcontractorService.getSubcontractors(this.userEmail).subscribe(
      (subcontractors) => {
        this.subcontractors = subcontractors;
        console.log('Subcontractors set:', this.subcontractors); // Debug log

        this.bidNumber = this.subcontractors.map((subcontractor, index) => {
          if (!subcontractor || subcontractor.bids === undefined) {
            console.log(`Subcontractor ${index} does not have bids property, setting bidNumber to 0.`);
            return '0';
          } else {
            console.log(`Subcontractor ${index} bids set to ${subcontractor.bids}`);
            return subcontractor.bids.toString();
          }
        });

        console.log('Bid numbers set:', this.bidNumber); // Debug log
        this.cd.detectChanges();
      },
      (error: any) => {
        console.error('Error fetching subcontractors:', error);
      }
    );
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
    const subcontractorIds = Array.from(this.selectedSubcontractors);
    if (subcontractorIds.length === 0) {
      console.error('No subcontractors selected.');
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px'; // Adjust width as necessary
    dialogConfig.autoFocus = true;
    dialogConfig.position = { top: '0px', left:'33%' }; // Adjust as needed

    const dialogRef = this.dialog.open(AddGroupDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subcontractorService.addSubcontractorsToGroup(this.userEmail, subcontractorIds, result.groupName, result.groupCity, result.groupType).subscribe({
          next: () => {
            console.log('Subcontractors added to group successfully.');
            this.getSubcontractorGroups(); // Optionally refresh groups or perform other actions
          },
          error: (error) => {
            console.error('Error adding subcontractors to group:', error);
          }
        });
      }
    });
  }

  deleteGroup(groupId: string) {
    if (confirm('Are you sure you want to delete this group?')) {
      this.subcontractorService.deleteSubcontractorGroup(this.userEmail, groupId).subscribe(
        () => {
          this.subcontractorGroups = this.subcontractorGroups.filter(group => group._id !== groupId);
        },
        (error: any) => {
          console.error('Error deleting group:', error);
        }
      );
    }
  }
}
