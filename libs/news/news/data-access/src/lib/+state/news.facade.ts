import {Injectable, inject} from '@angular/core';
import {select, Store, Action} from '@ngrx/store';

import * as NewsActions from './news.actions';
import * as NewsFeature from './news.reducer';
import * as NewsSelectors from './news.selectors';
import {NewsItemVM} from "../../../../feature-news-list/src/lib/news-item/news-item.vm";
import {map} from "rxjs";

@Injectable()
export class NewsFacade {
  private readonly store = inject(Store);
  public readonly loaded$ = this.store.pipe(select(NewsSelectors.selectNewsStatus));
  public readonly allNews$ = this.store.pipe(
    select(NewsSelectors.selectAllNews),
    map((newsItems) => {
      return newsItems
        .map((news) => ({ ...news, publishedDate: new Date(news.publishedDate.toString())}))
        .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
    })
  );
  public readonly selectedNews$ = this.store.pipe(select(NewsSelectors.selectEntity));
  public readonly status$ = this.store.pipe(select(NewsSelectors.selectNewsStatus))

  public init() {
    this.store.dispatch(NewsActions.initNews());
  }

  public addNewsItem(userData: NewsItemVM) {
    this.store.dispatch(NewsActions.addNewsActions.addNews(userData))
  }
}
