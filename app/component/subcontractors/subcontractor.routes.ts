import { Routes } from '@angular/router';
import { SubcontractorsComponent } from './subcontractors-list/subcontractors.component';
import { createNewSubcontractorComponent } from './create-new/create-new.component';

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
    ],
  },
];
