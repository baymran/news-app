import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
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

export const localStorageNews = createActionGroup({
  source: 'News/Page',
  events: {
    'Set State from local storage': props<{ news: NewsEntity[] }>(),
    'Get Items from local storage': emptyProps()
  }
  }
)

export const addNewsActions = createActionGroup({
  source: 'News/Page',
  events: {
    'Add News': props<NewsItemVM>(),
    'Add News Success': props<NewsEntity>(),
    'Add News Failure': props<{error: Error}>()
  }
})

export const loadMoreNews = createActionGroup({
  source: 'News/Page',
  events: {
    'Load More': props<{page: number}>(),
    'Load More Success': props<{ news: NewsEntity[], page: number }>(),
    'Load More Failure': props<{ error: any }>()
  }
})

export const loadNewsItem = createActionGroup({
  source: 'News/Detail',
  events: {
    'Load News Item': props<{slug: string}>(),
    'Load News Item Success': props<{entity: NewsEntity}>(),
    'Load News Item Failure': props<{error: any}>()
  }
})
