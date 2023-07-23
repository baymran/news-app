import {createAction, createActionGroup, props} from '@ngrx/store';
import {NewsEntity} from "@core/data-access";
import {NewsItemVM} from "../../../../feature-news-list/src/lib/news-item/news-item.vm";


export const initNews = createAction('[News Page] Init');

export const loadNewsSuccess = createAction(
  '[News/API] Load News Success',
  props<{ news: NewsEntity[] }>()
);

export const loadNewsFailure = createAction(
  '[News/API] Load News Failure',
  props<{ error: any }>()
);

export const addNewsActions = createActionGroup({
  source: 'News/Page',
  events: {
    'Add News': props<NewsItemVM>(),
    'Add News Success': props<NewsEntity>(),
    'Add News Failure': props<{error: Error}>()
  }
})
