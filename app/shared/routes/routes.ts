import { Routes } from '@angular/router';

export const dashData: Routes = [
  {
    path: 'dashboard',
    data: {
      title: 'Default',
      breadcrumb: 'Dashboard',
    },
    loadChildren: () =>
      import('../../../app/component/dashboard/dashboard.routes').then(
        (r) => r.dashboard
      ),
  },
  {
    path: 'project',
    data: {
      title: 'Project',
      breadcrumb: 'Project',
    },
    loadChildren: () =>
      import('../../component/project/project.routes').then((r) => r.Project),
  },
  {
    path: 'subcontractors',
    data: {
      title: 'Subcontractors',
      breadcrumb: 'Subcontractors',
    },
    loadChildren: () =>
      import('../../component/subcontractors/subcontractor.routes').then(
        (r) => r.Subcontractor
      ),
  },
  {
    path: 'lineitems',
    data: {
      title: 'Line Items',
      breadcrumb: 'Line Items',
    },
    loadChildren: () =>
      import('../../component/lineitems/lineitems.routes').then(
        (r) => r.LineItems
      ),
  },
  {
    path: 'profile',
    data: {
      title: 'User Profile',
      breadcrumb: 'User Profile',
    },
    loadChildren: () =>
      import('../../component/user/user.routes').then((r) => r.User),
  },
];
