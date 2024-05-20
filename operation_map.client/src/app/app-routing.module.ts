import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profileupdate/profileupdate.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './auth-guard/auth-guard.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ProjectFormComponent } from './project-form/project-form.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Base path to HomeComponent
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile-update', component: ProfileUpdateComponent, canActivate: [AuthGuard] },
  { path: 'project-form', component: ProjectFormComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
