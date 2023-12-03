import Link from 'next/link'
import { resolveHref } from '@/sanity/lib/utils'
import type { Category, SettingsPayload } from '@/types'
import classNames from 'classnames'
import { getTableElementStyle } from '@/util/styles-helper'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const categories = data?.categories || ([] as Category[])
  return (
    <div className="flex flex-col items-center px-4 py-4">
      {categories &&
        categories.map((category, index) => {
          const href = resolveHref(category._type, category.title)
          if (!href) {
            return null
          }
          return (
            <Link
              key={category.title}
              href={href}
              className={classNames(
                'w-[15rem] sm:w-[25rem] lg:max-w-[8rem] text-center max-w-xs',
                getTableElementStyle(index, categories.length),
              )}
            >
              {category.title}
            </Link>
          )
        })}
    </div>
  )
}
