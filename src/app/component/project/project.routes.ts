import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsBiddingComponent } from './bids/project-bids.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { ProjectsOverviewComponent } from './projects-overview/projects-overview.component';
import { ProjectsArchiveComponent } from './projects-archive/projects-archive.component';

export const Project: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ProjectListComponent,
        data: {
          title: 'Project List',
          breadcrumb: 'Project List',
        },
      },
      {
        path: 'create',
        component: CreateNewComponent,
        data: {
          title: 'Project Create',
          breadcrumb: 'Project Create',
        },
      },
      {
        path: 'edit/:projectId',
        component: CreateNewComponent,
        data: {
          title: 'Edit Project',
          breadcrumb: 'Edit Project',
        },
      },
      {
        path: 'overview/:projectId',
        component: ProjectsOverviewComponent,
        data: {
          title: 'Project Overview',
          breadcrumb: 'Project Overview',
        },
      },
      {
        path: 'archive',
        component: ProjectsArchiveComponent,
        data: {
          title: 'Project Archive',
          breadcrumb: 'Project Archive',
        },
      },
      {
        path: 'bids',
        component: ProjectsBiddingComponent,
        data: {
          title: 'Project Bids',
          breadcrumb: 'Project Bids',
        },
      },
    ],
  },
];
