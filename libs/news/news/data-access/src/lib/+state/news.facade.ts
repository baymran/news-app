import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as NewsActions from './news.actions';
import * as NewsFeature from './news.reducer';
import * as NewsSelectors from './news.selectors';

@Injectable()
export class NewsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(NewsSelectors.selectNewsLoaded));
  allNews$ = this.store.pipe(select(NewsSelectors.selectAllNews));
  selectedNews$ = this.store.pipe(select(NewsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(NewsActions.initNews());
  }
}
