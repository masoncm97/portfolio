import { BaseType, Medium, SearchParam, Tag } from '@/types'

export function isSearchParam(object: any): object is SearchParam {
  return (
    object !== null &&
    typeof object === 'object' &&
    'name' in object &&
    'value' in object &&
    typeof object.name === 'string' &&
    typeof object.value === 'string'
  )
}

function isBaseType(object: any): object is BaseType {
  return (
    object !== null &&
    typeof object === 'object' &&
    '_type' in object &&
    typeof object._type === 'string' &&
    (object.title === undefined || typeof object.title === 'string')
  )
}

export function isMedium(object: any): object is Medium {
  return object == undefined
    ? false
    : isBaseType(object) && object._type === 'medium'
}

export function isTag(object: any): object is Tag {
  return object == undefined
    ? false
    : isBaseType(object) && object._type === 'tag'
}

export function isTags(array: any[] | undefined | string): array is Tag[] {
  return Array.isArray(array) && array.every(isTag)
}
