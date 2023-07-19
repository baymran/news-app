import { createAction, props } from '@ngrx/store';
import { NewsEntity } from './news.models';

export const initNews = createAction('[News Page] Init');

export const loadNewsSuccess = createAction(
  '[News/API] Load News Success',
  props<{ news: NewsEntity[] }>()
);

export const loadNewsFailure = createAction(
  '[News/API] Load News Failure',
  props<{ error: any }>()
);
