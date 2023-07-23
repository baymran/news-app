import {Injectable, inject} from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import {switchMap, catchError, of, map, tap} from 'rxjs';
import * as NewsActions from './news.actions';
import {ApiService} from "@core/http";
import {newsDTOAdapter, NewsEntity, NewsItemDTO} from "@core/data-access";
import {newsVMAdapter} from "@news/feature-news-list";
import {getNewsKeysFromLocalStorage, getObjectsWithKeys} from "@core/utils";

export const newsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    actions$.subscribe(console.log)

    return actions$.pipe(
      ofType(NewsActions.initNews),
      switchMap(
        () => apiService.get<{ news: NewsItemDTO[], totalCount: number }>('/1/5').pipe(
          map(
            ({news}) => NewsActions.loadNewsSuccess({
              news: news.map(item => newsDTOAdapter.DTOtoEntity(item))
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(NewsActions.loadNewsFailure({error}));
          })
          )
      ),
    )
  }, {functional: true}
)

export const addNewsItem = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(NewsActions.addNewsActions.addNews),
      tap(userData => localStorage.setItem(userData.id.toString(), JSON.stringify(userData))),
      map(newsData => NewsActions.addNewsActions.addNewsSuccess(newsVMAdapter.VMToEntity(newsData)))
    )
  }, {functional: true}
)

export const addFromLocalStorage = createEffect(
  () => {
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(NewsActions.localStorageNews.getItemsFromLocalStorage),
      switchMap(() => {
        const keys: string[] = getNewsKeysFromLocalStorage();
        const entities$ = getObjectsWithKeys(keys); // Получение Observable<NewsEntity[]>

        // Преобразование Observable<NewsEntity[]> в Observable<NewsActions.SetStateFromLocalStorage>
        return entities$.pipe(
          map((entities) => NewsActions.localStorageNews.setStateFromLocalStorage({ news: entities }))
        );
      })
    )
  },
  { functional: true }
);

export const loadMoreNewsByScroll = createEffect(
  () => {
    const actions$ = inject(Actions)
    const apiService = inject(ApiService)
    return actions$.pipe(
      ofType(NewsActions.loadMoreNews.loadMore),
      switchMap(({page}) =>
        apiService.get<{ news: NewsItemDTO[] }>('/' + page + '/5/').pipe(
          map(
            ({news}) => NewsActions.loadMoreNews.loadMoreSuccess({
              news: news.map(item => newsDTOAdapter.DTOtoEntity(item)),
              page
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(NewsActions.loadMoreNews.loadMoreFailure({error}));
          })
        ))
    )
  }, {functional: true}
)
