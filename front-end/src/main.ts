import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { App } from './app/app';
import { APP_ROUTES } from './app/app.routes';


bootstrapApplication(App, {
    providers: [
        importProvidersFrom(BrowserModule, MatToolbarModule),
        provideBrowserGlobalErrorListeners(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))
    ]
})
  .catch(err => console.error(err));

