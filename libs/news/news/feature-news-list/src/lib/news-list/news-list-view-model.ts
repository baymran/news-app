import {NewsItemVM} from "../news-item/news-item.vm";
import {LoadingStatus} from "@core/data-access";
import {DeepReadonly} from "@core/utils";

export type NewsErrors = {
  status: string;
  [key: string]: unknown
}

export type NewsListVM = DeepReadonly<{
  news: NewsItemVM[],
  status: LoadingStatus
}>
