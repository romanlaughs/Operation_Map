import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../../api.service';
import { SharedService } from '../../../shared.service';
import { SubcontractorGroup } from '../../../shared/data/project/subcontractorgroup';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-subcontractor-group-list',
  standalone: true,
  imports: [CommonModule, FeathericonComponent, MatDialogModule, RouterModule],
  templateUrl: './subcontractors-group-list.component.html',
  styleUrls: ['./subcontractors-group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  subcontractorGroups: SubcontractorGroup[] = [];
  userEmail: string = SharedService.getEmail();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getSubcontractorGroups();
  }

  getSubcontractorGroups() {
    this.apiService.getSubcontractorGroups(this.userEmail).subscribe(
      (groups: SubcontractorGroup[]) => {
        this.subcontractorGroups = groups;
      },
      (error: any) => {
        console.error('Error fetching subcontractor groups:', error);
      }
    );
  }

  deleteGroup(group: SubcontractorGroup) {
    if (confirm('Are you sure you want to delete this group?')) {
      this.apiService
        .deleteSubcontractorGroup(this.userEmail, group._id)
        .subscribe(
          () => {
            this.subcontractorGroups = this.subcontractorGroups.filter(
              (g) => g._id !== group._id
            );
          },
          (error: any) => {
            console.error('Error deleting group:', error);
          }
        );
    }
  }
}
