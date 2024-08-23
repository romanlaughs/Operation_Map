import { Routes } from '@angular/router';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { dashData } from './shared/routes/routes';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/default',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: dashData,
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/component/layout/full/full.component').then(
        (m) => m.FullComponent
      ),
    children: [
      // your child routes here
    ],
  },
];
