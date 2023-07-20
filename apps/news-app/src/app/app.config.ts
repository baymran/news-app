import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { API_URL } from '@core/http';
import { appRoutes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {NEWS_FEATURE_KEY, newsEffects, NewsFacade, newsReducer} from '@news/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(newsEffects),
    // provideState(fromNews.NEWS_FEATURE_KEY, fromNews.newsReducer),
    NewsFacade,
    provideStore({
      [NEWS_FEATURE_KEY]: newsReducer
    }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    importProvidersFrom(NewsFacade),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
};
