import { Tag } from '@/types'
import { getCamelCase } from '@/util/styles-helper'
import { useCallback, useContext, useEffect, useId, useState } from 'react'
import InternalLink from '../InternalLink'
import { SuperScriptElement } from './SuperScriptElement'
import { CollectionsContext } from '@/app/providers/CollectionsProvider'

export const CheckboxLink = ({ tag }: { tag: Tag }) => {
  const tagId = useId()
  const [isChecked, setIsChecked] = useState(true)
  const { collectionFilters, setCollectionFilters } =
    useContext(CollectionsContext)

  const updateCheckbox = useCallback(() => {
    if (!tag.title) return
    if (!isChecked) {
      console.log('f', tag.title)
      console.log(collectionFilters.filter((col) => col == tag.title))
      setCollectionFilters((prev) => prev.filter((col) => col !== tag.title))
    } else {
      console.log('p', tag.title)
      setCollectionFilters((prev) => [...prev, tag.title])
    }
    setIsChecked((prev) => !prev)
  }, [setCollectionFilters, isChecked, tag.title])

  useEffect(() => {
    console.log('y')
    console.log(collectionFilters)
  }, [collectionFilters])

  return (
    <div className="grid grid-cols-[min-content,1fr] gap-1">
      <input
        className="mx-3"
        type="checkbox"
        id={tag.title}
        name={tag.title}
        value={tag.title}
        onChange={() => updateCheckbox()}
        checked={isChecked}
      />
      <label htmlFor={tagId}>
        <InternalLink
          href={'/'}
          //   onClick={() => setChooseTag(tag.title)}
          isNav={false}
          key={tag.title}
          tag={tag}
        >
          <SuperScriptElement title={getCamelCase(tag.title)} />
        </InternalLink>
      </label>
    </div>
  )
}
