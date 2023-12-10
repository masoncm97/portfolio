import type { Category, SettingsPayload, Tag } from '@/types'
import classNames from 'classnames'
import { getTableElementStyle } from '@/util/styles-helper'
import TagContainer from './TagContainer'
import { getSearchParamLink } from '@/components/shared/SearchParamLink/server/getSearchParamLink'

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
          return getSearchParamLink(
            category,
            classNames(
              'text-center max-w-xs w-[15rem] md:max-w-[8rem]',
              getTableElementStyle(index, categories.length + 1),
            ),
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
              return getSearchParamLink(tag)
            })}
        </div>
        <TagContainer tags={tags} />
      </div>
    </div>
  )
}
