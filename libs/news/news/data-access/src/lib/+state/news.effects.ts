import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as NewsActions from './news.actions';
import * as NewsFeature from './news.reducer';

@Injectable()
export class NewsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.initNews),
      switchMap(() => of(NewsActions.loadNewsSuccess({ news: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(NewsActions.loadNewsFailure({ error }));
      })
    )
  );
}
