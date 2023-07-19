import {NewsItemVM} from "../../../../news-vm";
import {LoadingStatus} from "@core/data-access";

export type NewsErrors = {
  status: string;
  [key: string]: unknown
}

export type NewsListVM = {
  news: NewsItemVM[],
  // status: LoadingStatus,
  // errors: NewsErrors | null,
}
