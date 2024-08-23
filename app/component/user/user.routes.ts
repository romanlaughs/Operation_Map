import { Routes } from '@angular/router';
import { UsersEditComponent } from './users-edit.component';

export const User: Routes = [
  {
    path: '',
    children: [
      {
        path: 'edit',
        component: UsersEditComponent,
        data: {
          title: 'Edit Profile',
          breadcrumb: 'Edit Profile',
        },
      },
    ],
  },
];
