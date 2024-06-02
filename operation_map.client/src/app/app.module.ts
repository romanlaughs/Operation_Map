import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './auth-guard/auth-guard.component';
import { ApiService } from './api.service';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';
import { TestComponent } from './test/test.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { ProfileUpdateComponent } from './profileupdate/profileupdate.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectsBiddingComponent } from './projects-bidding/projects-bidding.component';
import { ProjectsArchiveComponent } from './projects-archive/projects-archive.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ProjectsComponent,
    TestComponent,
    ProfileUpdateComponent,
    NavigationComponent,
    ProjectFormComponent,
    ProjectsBiddingComponent,
    ProjectsArchiveComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'profile-update', component: ProfileUpdateComponent, canActivate: [AuthGuard] },
      { path: 'project-form', component: ProjectFormComponent, canActivate: [AuthGuard] },
      { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'projects-bidding', component: ProjectsBiddingComponent, canActivate: [AuthGuard] },
      { path: 'projects-archive', component: ProjectsArchiveComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]),
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.auth0.audience
      },
      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.apiUrl}/*`,
          }
        ]
      },
      cacheLocation: 'localstorage', // This ensures tokens are stored in session storage
      useRefreshTokens: true
    })
  ],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
