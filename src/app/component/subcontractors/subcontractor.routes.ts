import { Routes } from '@angular/router';
import { SubcontractorsComponent } from './subcontractors-list/subcontractors.component';
import { createNewSubcontractorComponent } from './create-new/create-new.component';
import { GroupListComponent } from './subcontractors-group-list/subcontractors-group-list.component';
import { GroupDetailsComponent } from './subcontractor-group-details/subcontractor-group-details.component';

export const Subcontractor: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: SubcontractorsComponent,
        data: {
          title: 'Subcontractors List',
          breadcrumb: 'Subcontractors List',
        },
      },
      {
        path: 'create',
        component: createNewSubcontractorComponent,
        data: {
          title: 'Add New Subcontructor',
          breadcrumb: 'Subcontractor Create',
        },
      },
      {
        path: 'grouplist',
        component: GroupListComponent,
        data: {
          title: 'Service Cohort',
          breadcrumb: 'Service Cohort',
        },
      },
      {
        path: 'groupdetails/:groupId',
        component: GroupDetailsComponent,
        data: {
          title: 'Collective Profile',
          breadcrumb: 'Collective Profile',
        },
      },
    ],
  },
];
