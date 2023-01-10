import './polyfills';

import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      [
        {
          path: '',
          component: AppComponent,
        },
      ],
      withEnabledBlockingInitialNavigation()
    ),
    importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));
