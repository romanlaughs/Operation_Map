import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service'; // Adjust the import path
import { SubcontractorGroup } from '../models/subcontractorgroup.model'; // Adjust the import path
import { Subcontractor } from '../models/subcontractor.model'; // Adjust the import path
import { SharedService } from '../shared.service'


@Component({
  selector: 'app-subcontractor-group-details',
  templateUrl: './subcontractor-group-details.component.html',
  styleUrls: ['./subcontractor-group-details.component.css']
})
export class SubcontractorGroupDetailsComponent implements OnInit {
  group: SubcontractorGroup | null = null;
  id: string = '';
  subcontractors: { [id: string]: Subcontractor } = {};
  userEmail: string = SharedService.getEmail();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get('groupId');

    if (groupId) {
      this.apiService.getSubcontractorGroupById(this.userEmail, groupId).subscribe(
        (group) => {
          this.group = group;
          if (group && group.subcontractorIds) {
            this.loadSubcontractors(group.subcontractorIds);
          }
        },
        (error: any) => {
          console.error('Error fetching subcontractor group:', error);
        }
      );
    }
  }

  loadSubcontractors(subcontractorIds: string[]) {
    subcontractorIds.forEach(id => {
      this.apiService.getSubcontractorById(this.userEmail, id).subscribe(
        (sub) => {
          id = sub.id
          this.subcontractors[id] = sub;
          console.log(this.subcontractors);
        },
        (error: any) => {
          console.error('Error fetching subcontractor:', error);
        }
      );
    });
  }

  deleteGroup() {
    if (this.group && confirm('Are you sure you want to delete this group?')) {
      this.apiService.deleteSubcontractorGroup(this.userEmail, this.group._id).subscribe(
        () => {
          this.router.navigate(['/subcontractors']);
        },
        (error: any) => {
          console.error('Error deleting group:', error);
        }
      );
    }
  }

  removeMember(subcontractorId: string) {
    if (this.group && confirm('Are you sure you want to remove this member from the group?')) {
      this.apiService.removeMemberFromSubcontractorGroup(this.userEmail, this.group._id, subcontractorId).subscribe(
        () => {
          delete this.subcontractors[subcontractorId];
        },
        (error: any) => {
          console.error('Error removing member:', error);
        }
      );
    }
  }
}
