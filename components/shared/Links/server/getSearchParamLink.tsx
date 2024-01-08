import { resolveHref } from '@/sanity/lib/utils'
import { isSearchParam } from '../../../../util/type-guards'
import { SearchParamLink } from '@/components/shared/Links/server/SearchParamLink'
import classNames from 'classnames'
import { Category, Tag } from '@/types'
import TextElement from '../../TextElement'

export function getSearchParamLink(
  item: Tag | Category,
  className?: string,
  isNav = false,
) {
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
        isTag && !isNav ? 'text-blue-700 underline text-xs pt-1' : '',
      )}
      searchParam={href}
    >
      <TextElement as={isNav ? 'h2' : 'p'} size={isNav ? 'sm' : 'xs'}>
        {isTag && !isNav ? `#${item.title}` : item.title}
      </TextElement>
    </SearchParamLink>
  )
}
