import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";
import {API_URL} from "@core/http";
import {appRoutes} from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    importProvidersFrom(
    ),
    {
      provide: API_URL,
      useValue: environment.api_url
    }],
};
