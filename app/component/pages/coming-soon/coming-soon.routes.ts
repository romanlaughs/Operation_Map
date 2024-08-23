import { Routes } from '@angular/router';
import { SimpleComingComponent } from './simple-coming/simple-coming.component';
import { ComingBgVideoComponent } from './coming-bg-video/coming-bg-video.component';
import { ComingBgImageComponent } from './coming-bg-image/coming-bg-image.component';

export const CommingSoonPages: Routes = [
  {
    path: '',
    children: [
      {
        path: 'coming-soon-simple',
        component: SimpleComingComponent
      },
      {
        path: 'coming-soon-video',
        component: ComingBgVideoComponent
      },
      {
        path: 'coming-soon-image',
        component: ComingBgImageComponent
      },
    ]
  }
];