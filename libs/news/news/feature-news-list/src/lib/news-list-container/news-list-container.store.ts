import {ComponentStore} from "@ngrx/component-store";
import {inject, Injectable} from "@angular/core";
import {LoadingStatus, NewsEntity} from "@core/data-access";
import {DeepReadonly} from "@core/utils";
import {NewsFacade} from "@news/data-access";
import {NewsItemVM} from "../../../../news-vm";
import {tap} from "rxjs";
import {newsVMAdapter} from "@news/feature-news-list";

type NewsListState = DeepReadonly<{
  news: NewsItemVM[],
  status: LoadingStatus
}>

const initialState: NewsListState = {
  news: [],
  status: 'init'
}

@Injectable()
export class NewsListContainerStore extends ComponentStore<NewsListState> {
  private readonly newsFacade = inject(NewsFacade)
  public readonly news$ = this.select(this.newsFacade.allNews$, news => ({
    news
  }))

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
}
