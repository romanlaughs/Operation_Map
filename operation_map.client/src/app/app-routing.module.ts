import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profileupdate/profileupdate.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './auth-guard/auth-guard.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectsBiddingComponent } from './projects-bidding/projects-bidding.component';
import { ProjectsArchiveComponent } from './projects-archive/projects-archive.component';
import { SubcontractorsComponent } from './subcontractors/subcontractors.component';
import { SubcontractorFormComponent } from './subcontractor-form/subcontractor-form.component';
import { GroupsComponent } from './groups/groups.component';
import { SubcontractorGroupDetailsComponent } from './subcontractor-group-details/subcontractor-group-details.component';
import { MaterialsComponent } from './materials/materials.component';
import { AddMaterialDialogComponent } from './add-material-dialog/add-material-dialog.component';
import { ProjectsOverviewComponent } from './projects-overview/projects-overview.component'; // Adjust the import path
import { LineItemsComponent } from './line-items/line-items.component';
import { LineItemDialogComponent } from './line-item-dialog/line-item-dialog.component';
import { LineItemOverviewComponent } from './line-item-overview/line-item-overview.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Base path to HomeComponent
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile-update', component: ProfileUpdateComponent, canActivate: [AuthGuard] },
  { path: 'project-form', component: ProjectFormComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'projects-bidding', component: ProjectsBiddingComponent, canActivate: [AuthGuard] },
  { path: 'projects-archive', component: ProjectsArchiveComponent, canActivate: [AuthGuard] },
  { path: 'subcontractors', component: SubcontractorsComponent, canActivate: [AuthGuard] },
  { path: 'materials/:projectId', component: MaterialsComponent, canActivate: [AuthGuard] },
  { path: 'line-items/:projectId', component: LineItemsComponent, canActivate: [AuthGuard] },
  { path: 'line-item-dialog', component: LineItemDialogComponent, canActivate: [AuthGuard] },
  { path: 'line-item-overview/:id', component: LineItemOverviewComponent },
  { path: 'add-material', component: AddMaterialDialogComponent, canActivate: [AuthGuard] },
  { path: 'projects-overview/:projectId', component: ProjectsOverviewComponent, canActivate: [AuthGuard] },
  { path: 'sub-groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'subcontractor-group-details/:groupId', component: SubcontractorGroupDetailsComponent, canActivate: [AuthGuard] },
  { path: 'subcontractor-form', component: SubcontractorFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
