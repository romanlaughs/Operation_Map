import { Routes } from '@angular/router';
import { LineItemsComponent } from './line-items/line-items.component';

export const LineItems: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: LineItemsComponent,
        data: {
          title: 'Line Items',
          breadcrumb: 'Line Items',
        },
      },
    ],
  },
];
