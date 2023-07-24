import {DeepReadonly} from "@core/utils";
import {NewsListVM} from "../../../../feature-news-list/src/lib/news-list/news-list-view-model";
import {DestroyRef, inject, Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {LoadingStatus, NewsEntity} from "@core/data-access";
import {NewsFacade} from "@news/data-access";
import {filter, map, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {newsDetailVmAdapter} from "../news-detail.vm.adapter";

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
  public readonly newsItem$ = this.select(state => state.newsItem).pipe(
    filter(Boolean),
    map(entity => newsDetailVmAdapter.entittyToVM(entity))
  )
  public readonly status$ = this.select(state => state.status)

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
