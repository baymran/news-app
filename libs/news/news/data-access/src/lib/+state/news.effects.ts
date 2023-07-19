import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {switchMap, catchError, of, map} from 'rxjs';
import * as NewsActions from './news.actions';
import {ApiService} from "@core/http";
import {newsDTOAdapter, NewsEntity, NewsItemDTO} from "@core/data-access";

export const newsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    actions$.subscribe(console.log)

    return actions$.pipe(
      ofType(NewsActions.initNews),
      switchMap(
        () => apiService.get<{ news: NewsItemDTO[] }>('/1/10').pipe(
          map(
            ({news}) => NewsActions.loadNewsSuccess({
              news: news.map(item => newsDTOAdapter.DTOtoEntity(item))
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(NewsActions.loadNewsFailure({ error }));
          })
        )
      ),
    )
  }, {functional: true}
)
