import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as NewsActions from './news.actions';
import { NewsEntity } from './news.models';

export const NEWS_FEATURE_KEY = 'news';

export interface NewsState extends EntityState<NewsEntity> {
  selectedId?: string | number; // which News record has been selected
  loaded: boolean; // has the News list been loaded
  error?: string | null; // last known error (if any)
}

export interface NewsPartialState {
  readonly [NEWS_FEATURE_KEY]: NewsState;
}

export const newsAdapter: EntityAdapter<NewsEntity> =
  createEntityAdapter<NewsEntity>();

export const initialNewsState: NewsState = newsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialNewsState,
  on(NewsActions.initNews, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(NewsActions.loadNewsSuccess, (state, { news }) =>
    newsAdapter.setAll(news, { ...state, loaded: true })
  ),
  on(NewsActions.loadNewsFailure, (state, { error }) => ({ ...state, error }))
);

export function newsReducer(state: NewsState | undefined, action: Action) {
  return reducer(state, action);
}
