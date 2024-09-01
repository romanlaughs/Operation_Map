import { Routes } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { ChartComponent } from './chart/chart.component';

export const widgets: Routes = [
    {
        path: '',
        children: [
            {
                path: 'general',
                component: GeneralComponent,
                data: {
                    title: "General",
                    breadcrumb: "General",
                  }
            },
            {
                path: 'chart',
                component: ChartComponent,
                data: {
                    title: "chart",
                    breadcrumb: "chart",
                  }
            },
        ]
    }
];