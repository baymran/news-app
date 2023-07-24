import {NewsDetailItem} from "./news-detail.vm";
import {NewsEntity} from "@core/data-access";


export type NewsDetailVmAdapter = {
  entittyToVM(entity: NewsEntity): NewsDetailItem
}

export const newsDetailVmAdapter: NewsDetailVmAdapter = {
  entittyToVM(entity: NewsEntity): NewsDetailItem {
    const {categoryType, ...otherFields} = entity
    return {
      ...otherFields
    }
  }
}
