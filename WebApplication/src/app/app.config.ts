import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideQuillConfig } from 'ngx-quill';
import { setBaseUrl } from './httpInterceptors/setBaseUrlInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([setBaseUrl])),
    provideQuillConfig({
      modules: {
        syntax: true,
      }
    })
  ],
};
