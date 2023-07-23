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
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {NEWS_FEATURE_KEY, NewsFacade, newsEffects, newsReducer} from '@news/data-access';
import { provideAnimations } from '@angular/platform-browser/animations';

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
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideAnimations()
],
};
