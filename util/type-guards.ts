import { SearchParam } from '@/types'

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
