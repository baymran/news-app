import {NewsItemDTO} from "./news-dto.model";

export type NewsEntity = Omit<NewsItemDTO, 'fullUrl'>
