import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Import your routes configuration
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// Function to create TranslateLoader
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}

// Collect all providers for TranslateModule
const translateModule = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

// Ensure translateProviders is an array
const translateProviders = translateModule?.providers || [];

const providers = [
  provideHttpClient(withInterceptorsFromDi()),
  provideRouter(routes), // Ensure 'routes' is properly configured
  provideAuth0({
    domain: environment.auth0.domain,
    clientId: environment.auth0.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: environment.auth0.audience,
    },
    httpInterceptor: {
      allowedList: [
        {
          uri: `${environment.apiUrl}/*`,
        },
      ],
    },
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
  }),
  ...translateProviders, // Spread translateProviders to ensure correct array structure
];

// Bootstrap the application
bootstrapApplication(AppComponent, {
  providers,
}).catch((err) => console.error(err));
