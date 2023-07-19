import {DeepReadonly} from "@core/utils";

export type NewsItemDTO = DeepReadonly<{
  id: number;
  title: string;
  description: string;
  publishedDate: Date;
  url: string;
  fullURL: string;
  titleImageURL: string;
  categoryType: string;
}>

export type NewsItemDetailDTO = DeepReadonly<NewsItemDTO & {text: string}>
