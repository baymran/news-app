import {Injectable, inject, DestroyRef} from '@angular/core';
import {select, Store, Action} from '@ngrx/store';

import * as NewsActions from './news.actions';
import * as NewsSelectors from './news.selectors';
import {NewsItemVM} from "../../../../feature-news-list/src/lib/news-item/news-item.vm";
import {map, Observable, Subscription} from "rxjs";
import {LoadingStatus, NewsEntity} from "@core/data-access";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable()
export class NewsFacade {
  private readonly store = inject(Store);
  public readonly loaded$ = this.store.pipe(select(NewsSelectors.selectNewsStatus));
  public readonly selectedNews$: Observable<NewsEntity | undefined> = this.store.pipe(select(NewsSelectors.selectEntity));
  public readonly status$: Observable<LoadingStatus> = this.store.pipe(select(NewsSelectors.selectNewsStatus))
  private readonly destroyRef = inject(DestroyRef);
  public readonly openedNewsItem$ = this.store.select(NewsSelectors.selectOpenedNewsItem);

  private currentPageNumber: number = 2 // потом вынесу
  private readonly currentPage$: Subscription = this.store.pipe(select(NewsSelectors.selectCurrentPage)).pipe(
    takeUntilDestroyed(this.destroyRef)).subscribe(page => this.currentPageNumber + page)

  public readonly allNews$ = this.store.pipe(
    select(NewsSelectors.selectAllNews),
    map((newsItems) => {
      return newsItems
        .map((news) => ({...news, publishedDate: new Date(news.publishedDate.toString())}))
        .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
    })
  );

  public init() {
    this.store.dispatch(NewsActions.initNews());
    this.store.dispatch(NewsActions.localStorageNews.getItemsFromLocalStorage())
  }

  public addNewsItem(newsItem: NewsItemVM) {
    this.store.dispatch(NewsActions.addNewsActions.addNews(newsItem))
  }

  public loadNextPage() {
    this.store.dispatch(NewsActions.loadMoreNews.loadMore({page: this.currentPageNumber++}))
  }
}
