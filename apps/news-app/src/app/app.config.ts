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
import * as fromNews from '@news/data-access';
import { NewsEffects, NewsFacade } from '@news/data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(NewsEffects),
    provideState(fromNews.NEWS_FEATURE_KEY, fromNews.newsReducer),
    NewsFacade,
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(),
    provideStore(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    importProvidersFrom(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
  ],
};
