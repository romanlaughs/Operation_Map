import { Routes } from '@angular/router';
import { ErrorPage1Component } from './error-page-1/error-page-1.component';
import { ErrorPage2Component } from './error-page-2/error-page-2.component';
import { ErrorPage3Component } from './error-page-3/error-page-3.component';
import { ErrorPage4Component } from './error-page-4/error-page-4.component';
import { ErrorPage5Component } from './error-page-5/error-page-5.component';
import { ErrorPage6Component } from './error-page-6/error-page-6.component';

export const ErrorPages: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error-page1',
        component:ErrorPage1Component 
      },
      {
        path: 'error-page2',
        component:ErrorPage2Component 
      },
      {
        path: 'error-page3',
        component: ErrorPage3Component
      },
      {
        path: 'error-page4',
        component: ErrorPage4Component
      },
      {
        path: 'error-page5',
        component: ErrorPage5Component
      },
      {
        path: 'error-page6',
        component: ErrorPage6Component
      }
    ]
  }
];