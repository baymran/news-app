import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('@news/home').then(c => c.HomeComponent)
  },
  {
    path: 'detail/:category/:slug',
    loadComponent: () => import('@news/feature-news-detail').then(c => c.NewsDetailContainerComponent),
    pathMatch: 'full'
  },

];
