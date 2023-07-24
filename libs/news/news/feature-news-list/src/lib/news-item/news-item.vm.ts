import {DeepReadonly} from "@core/utils";
import {NewsItemDTO} from "@core/data-access";

export type NewsItemVM = DeepReadonly<Pick<NewsItemDTO, 'id' | 'title' | 'description' | 'publishedDate' | 'titleImageUrl' | 'url'>>

