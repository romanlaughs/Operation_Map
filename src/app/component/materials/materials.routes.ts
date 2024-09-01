import { Routes } from '@angular/router';
import { MaterialListComponent } from './material-list/material-list.component';

export const Materials: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: MaterialListComponent,
        data: {
          title: 'Material List',
          breadcrumb: 'Material List',
        },
      },
    ],
  },
];
