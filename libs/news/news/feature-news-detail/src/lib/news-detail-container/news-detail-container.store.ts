import {DeepReadonly} from "@core/utils";
import {NewsListVM} from "../../../../feature-news-list/src/lib/news-list/news-list-view-model";
import {DestroyRef, inject, Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {LoadingStatus, NewsEntity, selectQueryParams, selectRouteParams} from "@core/data-access";
import {NewsFacade} from "@news/data-access";
import {filter, map, tap, withLatestFrom} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {newsDetailVmAdapter} from "../news-detail.vm.adapter";
import {Store} from "@ngrx/store";

type NewsItemState = DeepReadonly<{
  newsItem: NewsEntity | null
  status: LoadingStatus
}>

const initialState: NewsItemState = {
  newsItem: null,
  status: 'init'
}

@Injectable({providedIn: "root"})
export class NewsDetailContainerStore extends ComponentStore<NewsItemState> {
  private readonly newsFacade = inject(NewsFacade);
  private destroyRef = inject(DestroyRef)
  private store = inject(Store)
  public readonly status$ = this.select(state => state.status)
  public readonly newsItem$ = this.select(state => state.newsItem).pipe(
    withLatestFrom(this.store.select(selectRouteParams)),
    tap(([item, params]) => {
      if(!item && params['category'] && params['slug']) {
        const slug = `${params['category']}/${params['slug']}`
        console.log(slug)
        this.newsFacade.fetchNewsItem(slug)
      }
    }),
    map(([entity, params]) => entity),
    filter(Boolean),
    map(entity => newsDetailVmAdapter.entittyToVM(entity))
  )

  constructor() {
    super(initialState);
    this.setCurrentNews()
  }

  private setNewsItem(newsItem: NewsEntity) {
    this.setState({newsItem, status: 'loaded'} );
  }

  public setCurrentNews() {
    this.newsFacade.openedNewsItem$.pipe(
      filter(Boolean),
      tap(newsItem => {
        this.setNewsItem(newsItem);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
