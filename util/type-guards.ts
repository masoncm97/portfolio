import { BaseType, Medium, SearchParam } from '@/types'

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
    // Check for optional property 'title'
    (object.title === undefined || typeof object.title === 'string')
  )
}

export function isMedium(object: any): object is Medium {
  return object == undefined
    ? false
    : isBaseType(object) && object._type === 'medium'
}
