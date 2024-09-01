import { Routes } from '@angular/router';

export const fullRoutes: Routes = [
  {
    path: 'error-page',
    loadChildren: () =>
      import('../../component/pages/error-pages/error.routes').then(
        (r) => r.ErrorPages
      ),
  },
  {
    path: 'coming-soon',
    loadChildren: () =>
      import('../../component/pages/coming-soon/coming-soon.routes').then(
        (r) => r.CommingSoonPages
      ),
  },
];
