import {DeepReadonly} from "@core/utils";

export type NewsItemDTO = DeepReadonly<{
  id: number;
  title: string;
  description: string;
  publishedDate: Date;
  url: string;
  fullUrl: string;
  titleImageUrl: string;
  categoryType: string;
}>

export type NewsItemDetailDTO = DeepReadonly<NewsItemDTO & {text: string}>
