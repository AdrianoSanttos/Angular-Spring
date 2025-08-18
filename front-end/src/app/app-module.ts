import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { App } from './app';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    MatToolbarModule,
    //HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
