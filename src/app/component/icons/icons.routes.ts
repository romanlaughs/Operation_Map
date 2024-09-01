import { Routes } from '@angular/router';
import { FeathersIconComponent } from './feather-icon/feather-icon.component';
import { FontAwesomeComponent } from './font-awesome/font-awesome.component';
import { IcoIconComponent } from './ico-icon/ico-icon.component';
import { ThemifyIconComponent } from './themify-icon/themify-icon.component';

export const Icons: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fontawesome-icons',
        component: FontAwesomeComponent,
        data: {
          title: 'Font Awesome Icon',
          breadcrumb: 'Font Awesome Icon',
        },
      },
      {
        path: 'feather-icons',
        component: FeathersIconComponent,
        data: {
          title: 'Feather Icon',
          breadcrumb: 'Feather Icon',
        },
      },
      {
        path: 'ico-icons',
        component: IcoIconComponent,
        data: {
          title: 'ICO Icon',
          breadcrumb: 'ICO Icon',
        },
      },
      {
        path: 'themify-icons',
        component: ThemifyIconComponent,
        data: {
          title: 'Themify Icon',
          breadcrumb: 'Themify Icon',
        },
      },
    ],
  },
];
