import {NewsItemVM} from "./news-item/news-item.vm";
import {NewsEntity} from "@core/data-access";

type newsVMAdapter = {
  entityToVM(entity: NewsEntity): NewsItemVM;
  VMToEntity(vmItem: NewsItemVM): NewsEntity;
}

export const newsVMAdapter: newsVMAdapter = {
  entityToVM({ id, title, description, publishedDate, titleImageUrl }) {
    return { id, title, description, publishedDate,
      titleImageUrl
    }
  },
  VMToEntity(vmItem: NewsItemVM): NewsEntity {
    return {
      ...vmItem,
      url: '',
      categoryType: ''
    }
  }
}
