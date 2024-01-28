import classNames from 'classnames'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { resolveHref } from '@/sanity/lib/utils'
import tag from '@/sanity/schemas/documents/tag'
import { Tag } from '@/types'
import { getCamelCase } from '@/util/styles-helper'
import { isSearchParam } from '@/util/type-guards'

import InternalLink from '../InternalLink'
import { SuperScriptElement } from './SuperScriptElement'

export const Collections = ({ tags }: { tags: Tag[] }) => {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const searchTag = searchParams.get('tag')
  const tag = tags.find((tag) => tag.title === searchTag)
  const [selected, setSelected] = useState(tag?.title || '')

  const setChooseTag = (tag: string | undefined) => {
    if (!tag) {
      tag = ''
    }
    setSelected(tag)
    // setIsOpen(false)
  }

  if (tag) {
    const href = resolveHref(tag._type, tag.title)
    if (!href || !isSearchParam(href)) {
      return null
    }
  }
  return (
    <ul className="mx-auto grid gap-1 place-items-start">
      {tags &&
        tags.map((tag, index) => (
          <div key={index} className="grid grid-cols-[min-content,1fr] gap-1">
            <input
              className="mx-3"
              type="checkbox"
              id={tag.title}
              name={tag.title}
              value={tag.title}
            />
            <InternalLink
              href={'/'}
              onClick={() => setChooseTag(tag.title)}
              isNav={false}
              key={tag.title}
              tag={tag}
            >
              <SuperScriptElement title={getCamelCase(tag.title)} />
            </InternalLink>
          </div>
        ))}
    </ul>
  )
}
