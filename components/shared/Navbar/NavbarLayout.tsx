import { resolveHref } from '@/sanity/lib/utils'
import type { Category, SettingsPayload, Tag } from '@/types'
import classNames from 'classnames'
import { getTableElementStyle } from '@/util/styles-helper'
import SearchParamLink from '../SearchParamLink'
import { isSearchParam } from '@/util/type-guards'
import TagContainer from './TagContainer'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const categories = data?.categories || ([] as Category[])
  const tags = data?.tags || ([] as Tag[])
  return (
    <div className="flex flex-col items-center md:flex-row px-4 py-4">
      {categories &&
        categories.map((category, index) => {
          const href = resolveHref(category._type, category.title)
          if (!href || !isSearchParam(href)) {
            return null
          }
          return (
            <div
              key={category.title}
              className={classNames(
                ' text-center max-w-xs w-[15rem] md:max-w-[8rem]',
                getTableElementStyle(index, categories.length + 1),
              )}
            >
              <SearchParamLink link={category.title} searchParam={href} />
            </div>
          )
        })}
      <div
        className={classNames(
          getTableElementStyle(categories.length - 1, categories.length),
          'w-[15rem] md:max-w-[8rem] p-2 gap-1 relative h-[8rem]',
        )}
      >
        <div className="flex flex-wrap absolute text-center">
          {tags &&
            tags.map((tag) => {
              const href = resolveHref(tag._type, tag.title)
              if (!href || !isSearchParam(href)) {
                return null
              }
              return (
                <SearchParamLink
                  key={tag.title}
                  className={classNames(
                    'text-blue-700 underline text-xs pr-2 pt-1',
                  )}
                  link={`#${tag.title}`}
                  searchParam={href}
                />
              )
            })}
        </div>
        <TagContainer tags={tags} />
      </div>
    </div>
  )
}

{
  /* <Link
  key={category.title}
  href={{ pathname: '/', query: { category: href } }}
  className={classNames(
    'w-[15rem] sm:w-[25rem] lg:max-w-[8rem] text-center max-w-xs',
    getTableElementStyle(index, categories.length),
  )}
>
  {category.title}
</Link> */
}
