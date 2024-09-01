import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Subcontractor } from '../../../shared/data/project/subcontractors';
import { SharedService } from '../../../shared.service';
import { SubcontractorGroup } from '../../../shared/data/project/subcontractorgroup';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';
import {
  MatDialogModule,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { SubcontractorsDialogComponent } from '../../subcontractors/subcontractors-dialog/subcontractors-dialog.component';
import { createNewSubcontractorComponent } from '../../subcontractors/create-new/create-new.component';

@Component({
  selector: 'app-subcontractor-group-details',
  standalone: true,
  imports: [CommonModule, FeathericonComponent, MatDialogModule],
  templateUrl: './subcontractor-group-details.component.html',
  styleUrls: ['./subcontractor-group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  group: SubcontractorGroup | null = null;
  subcontractors: { [id: string]: Subcontractor } = {};
  userEmail: string = SharedService.getEmail();

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get('groupId');
    if (groupId) {
      this.apiService
        .getSubcontractorGroupById(this.userEmail, groupId)
        .subscribe(
          (group) => {
            console.log('Fetched Group:', group);
            this.group = group;

            if (group && group.subcontractorIds) {
              this.loadSubcontractors(group.subcontractorIds);
            } else {
              console.warn('No subcontractor IDs found in group');
            }
          },
          (error: any) => {
            console.error('Error fetching subcontractor group:', error);
          }
        );
    } else {
      console.warn('No Group ID found in route parameters');
    }
  }

  openDialog(subcontractorId: string): void {
    console.log('Opening dialog for subcontractorId:', subcontractorId);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = true;

    dialogConfig.data = { subcontractorId };

    const dialogRef = this.dialog.open(
      SubcontractorsDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  openAddNewSubcontractorDialog(): void {
    if (!this.group) {
      console.warn('Group is not loaded yet.');
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '80%';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.autoFocus = true;
    dialogConfig.data = { group: this.group };

    const dialogRef = this.dialog.open(
      createNewSubcontractorComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog result:', result);
        // Handle result and add subcontractor to the group
        this.addSubcontractorToGroup(result); // Assuming result contains subcontractor details
      }
    });
  }

  loadSubcontractors(subcontractorIds: string[]): void {
    console.log('Loading subcontractors with IDs:', subcontractorIds);

    subcontractorIds.forEach((id) => {
      this.apiService.getSubcontractorById(this.userEmail, id).subscribe(
        (sub) => {
          console.log('Fetched Subcontractor:', sub);
          this.subcontractors[id] = sub;
        },
        (error: any) => {
          console.error('Error fetching subcontractor:', error);
        }
      );
    });
  }

  deleteGroup(): void {
    if (this.group && confirm('Are you sure you want to delete this group?')) {
      this.apiService
        .deleteSubcontractorGroup(this.userEmail, this.group._id)
        .subscribe(
          () => {
            this.router.navigate(['/subcontractors']);
          },
          (error: any) => {
            console.error('Error deleting group:', error);
          }
        );
    }
  }

  removeMember(subcontractorId: string): void {
    if (
      this.group &&
      confirm('Are you sure you want to remove this member from the group?')
    ) {
      this.apiService
        .removeMemberFromSubcontractorGroup(
          this.userEmail,
          this.group._id,
          subcontractorId
        )
        .subscribe(
          () => {
            delete this.subcontractors[subcontractorId];
          },
          (error: any) => {
            console.error('Error removing member:', error);
          }
        );
    }
  }

  addSubcontractorToGroup(newSubcontractor: Subcontractor): void {
    if (!this.group) {
      console.error('No group is currently selected.');
      return;
    }

    if (newSubcontractor.id) {
      const currentIds = this.group.subcontractorIds || []; // Handle undefined
      this.apiService
        .addSubcontractorsToGroup(
          this.userEmail,
          [...currentIds, newSubcontractor.id],
          this.group.groupName,
          this.group.groupCity,
          this.group.groupType
        )
        .subscribe(
          () => {
            console.log('Subcontractor added successfully');
            if (this.group) {
              this.group.subcontractorIds = [
                ...currentIds,
                newSubcontractor.id,
              ];
              this.subcontractors[newSubcontractor.id] = newSubcontractor;
            }
          },
          (error: any) => {
            console.error('Error adding subcontractor:', error);
          }
        );
    }
  }
}
