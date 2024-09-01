import { Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';

export const dashboard: Routes = [
  {
    path: '',
    children: [
      {
        path: 'default',
        component: DefaultComponent,
        data: {
          title: 'Welcome to MAP',
          breadcrumb: 'Default',
          des: "Welcome back! Let's start from where you left",
        },
      },
    ],
  },
];
