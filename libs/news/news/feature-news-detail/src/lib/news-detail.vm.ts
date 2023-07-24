import {LoadingStatus, NewsEntity} from "@core/data-access";
import {DeepReadonly} from "@core/utils";
import {NewsItemVM} from "../../../feature-news-list/src/lib/news-item/news-item.vm";

export type NewsDetailItem = NewsItemVM & {text?: string}

export type NewsDetailVm = DeepReadonly<{
  newsItem: NewsDetailItem,
  status: LoadingStatus
}>
