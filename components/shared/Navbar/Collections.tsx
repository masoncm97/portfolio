import classNames from 'classnames'
import { usePathname, useSearchParams } from 'next/navigation'
import { useId, useState } from 'react'

import { resolveHref } from '@/sanity/lib/utils'
import tag from '@/sanity/schemas/documents/tag'
import { Tag } from '@/types'
import { getCamelCase } from '@/util/styles-helper'
import { isSearchParam } from '@/util/type-guards'

import InternalLink from '../InternalLink'
import { SuperScriptElement } from './SuperScriptElement'
import { CheckboxLink } from './CheckboxLink'

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
  const tagId = useId()

  return (
    <ul className="mx-auto grid gap-1 place-items-start">
      {tags && tags.map((tag) => <CheckboxLink key={tag.title} tag={tag} />)}
    </ul>
  )
}
