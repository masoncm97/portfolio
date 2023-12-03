import { resolveHref } from '@/sanity/lib/utils'
import type { Category, SettingsPayload } from '@/types'
import classNames from 'classnames'
import { getTableElementStyle } from '@/util/styles-helper'
import NavbarItem from './NavbarItem'
import { isSearchParam } from '@/util/type-guards'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const categories = data?.categories || ([] as Category[])
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
                'w-[15rem] md:max-w-[8rem] text-center max-w-xs',
                getTableElementStyle(index, categories.length),
              )}
            >
              <NavbarItem category={category} searchParam={href} />
            </div>
          )
        })}
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
