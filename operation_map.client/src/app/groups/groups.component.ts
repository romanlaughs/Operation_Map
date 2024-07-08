// groups.component.ts
import { Component, OnInit } from '@angular/core';
import { SubcontractorGroup } from '../models/subcontractorgroup.model';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  userEmail: string = ''; // Replace with the actual user email
  groups: SubcontractorGroup[] = [];

  constructor(private subcontractorService: ApiService) { }

  ngOnInit(): void {
    this.subcontractorService.getSubcontractorGroups(this.userEmail).subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }
}
