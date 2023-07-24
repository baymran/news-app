import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as NewsActions from './news.actions';
import {LoadingStatus, NewsEntity} from "@core/data-access";
import {NewsErrors} from "../../../../feature-news-list/src/lib/news-list/news-list-view-model";

export const NEWS_FEATURE_KEY = 'news';

export interface NewsState extends EntityState<NewsEntity> {
  selectedId?: string | number; // which News record has been selected
  status: LoadingStatus; // has the News list been loaded
  page: number;
  error?: NewsErrors | null; // last known error (if any)
}

export interface NewsPartialState {
  readonly [NEWS_FEATURE_KEY]: NewsState;
}

export const newsAdapter: EntityAdapter<NewsEntity> =
  createEntityAdapter<NewsEntity>();

export const initialNewsState: NewsState = newsAdapter.getInitialState({
  // set initial required properties
  status: 'init',
  page: 0,
  error: null
});

const reducer = createReducer(
  initialNewsState,
  on(NewsActions.initNews, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(NewsActions.loadNewsSuccess, (state, {news}) =>
    newsAdapter.addMany(news, {...state, status: 'loaded' as const, page: 1})
  ),
  on(NewsActions.loadNewsFailure, (state, { error }) => ({ ...state, error, status: 'error' as const })),
  on(NewsActions.addNewsActions.addNewsSuccess, (state, newEntity) =>
    newsAdapter.addOne(newEntity, {...state})
  ),
  on(NewsActions.localStorageNews.setStateFromLocalStorage, (state, {news}) =>
    newsAdapter.addMany(news, state)
  ),
  on(NewsActions.loadMoreNews.loadMoreSuccess, (state, {news, page}) =>
  newsAdapter.addMany(news, {...state, status: 'loaded' as const, page})),
  on(NewsActions.loadNewsItem.loadNewsItem, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(NewsActions.loadNewsItem.loadNewsItemSuccess, (state, {entity}) => {
    const updatedState = {...state, status: 'loaded' as const}
    return newsAdapter.updateOne({id: entity.id, changes: entity}, updatedState)
  }
));

export function newsReducer(state: NewsState | undefined, action: Action) {
  return reducer(state, action);
}
