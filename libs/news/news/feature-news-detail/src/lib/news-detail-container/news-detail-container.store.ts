import {DeepReadonly} from "@core/utils";
import {NewsListVM} from "../../../../feature-news-list/src/lib/news-list/news-list-view-model";
import {inject, Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {LoadingStatus, NewsEntity} from "@core/data-access";
import {NewsFacade} from "@news/data-access";

type NewsItemState = DeepReadonly<{
  newsItem: NewsEntity | null
  status: LoadingStatus
}>

const initialState: NewsItemState = {
  newsItem: null,
  status: 'init'
}

@Injectable()
export class NewsDetailContainerStore extends ComponentStore<NewsItemState> {
  private readonly newsFacade = inject(NewsFacade);
  public readonly newsItem$ = this.select(state => state.newsItem)
}
