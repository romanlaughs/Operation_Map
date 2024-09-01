import { Routes } from '@angular/router';
import { SearchResultComponent } from './search-result.component';

export const Search: Routes = [
    {
        path: '',
        component: SearchResultComponent,
        data: {
            title: 'Search Website',
            breadcrumb: 'Search Website'
          }
    }
]