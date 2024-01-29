import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { resolveHref } from '@/sanity/lib/utils'
import { Tag } from '@/types'
import { isSearchParam } from '@/util/type-guards'

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
  return (
    <ul className="mx-auto grid gap-1 place-items-start">
      {tags && tags.map((tag) => <CheckboxLink key={tag.title} tag={tag} />)}
    </ul>
  )
}
