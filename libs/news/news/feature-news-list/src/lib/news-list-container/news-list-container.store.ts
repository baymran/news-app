import {ComponentStore} from "@ngrx/component-store";
import {inject, Injectable} from "@angular/core";
import {NewsEntity} from "@core/data-access";
import {DeepReadonly} from "@core/utils";
import {NewsFacade} from "@news/data-access";
import {tap} from "rxjs";
import {newsVMAdapter} from "@news/feature-news-list";
import {NewsListVM} from "../news-list/news-list-view-model";

type NewsListState = DeepReadonly<NewsListVM>

const initialState: NewsListState = {
  news: [],
  status: 'init'
}

@Injectable()
export class NewsListContainerStore extends ComponentStore<NewsListState> {
  private readonly newsFacade = inject(NewsFacade)
  public readonly news$ = this.select( state => state.news)
  public readonly status$ = this.select(this.newsFacade.status$, status => status)

  constructor() {
    super(initialState);
    this.newsFacade.init();
    this.setNewsFromGlobalToLocalStore()
  }

  private setNewsFromGlobalToLocalStore(): void {
    this.effect(
      () => this.newsFacade.allNews$.pipe(
        tap((news: NewsEntity[]) => this.patchNews(news))
      )
    )
  }

  private patchNews(news: NewsEntity[]): void {
    this.patchState({
      news: news.map(
        item => newsVMAdapter.entityToVM(item)
      )
    })
  }

  public loadMoreNewsByScroll() {
    this.newsFacade.loadNextPage()
  }

  public fetchItemDetails(slug: string) {
    this.newsFacade.fetchNewsItem(slug)
  }
}
