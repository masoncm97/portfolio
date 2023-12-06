import { resolveHref } from '@/sanity/lib/utils'
import { isSearchParam } from '../../../util/type-guards'
import SearchParamLink from '@/components/shared/SearchParamLink/SearchParamLink'
import classNames from 'classnames'
import { Category, Tag } from '@/types'

export function getSearchParamLink(item: Tag | Category, className?: string) {
  const href = resolveHref(item._type, item.title)
  const isTag = item._type === 'tag'
  if (!href || !isSearchParam(href)) {
    return null
  }
  return (
    <SearchParamLink
      key={item.title}
      className={classNames(
        className,
        isTag ? 'text-blue-700 underline text-xs pr-2 pt-1' : '',
      )}
      link={isTag ? `#${item.title}` : item.title}
      searchParam={href}
    />
  )
}
