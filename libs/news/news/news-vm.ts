import {DeepReadonly} from "@core/utils";
import {NewsEntity} from "@core/data-access";

export type NewsItemVM = DeepReadonly<
  Pick<NewsEntity, 'id' | 'title' | 'description' | 'publishedDate' | 'titleImageUrl'>
>
