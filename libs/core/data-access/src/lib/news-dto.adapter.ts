import {NewsEntity, NewsItemDTO} from "@core/data-access";

type NewsDtoAdapter = {
  DTOtoEntity(dto: NewsEntity): NewsEntity,
  entityToDTO(entity: NewsEntity): NewsItemDTO
}

export const newsDTOAdapter: NewsDtoAdapter = {
  DTOtoEntity(dto: NewsItemDTO): NewsEntity {
    const {fullURL, ...otherFields} = dto
    return {
      ...otherFields
    }
  },
  entityToDTO(entity: NewsEntity): NewsItemDTO {
    return {
      ...entity,
      fullURL: ''
    }
  }
}
