import { useCallback, useContext, useEffect, useId, useState } from 'react'

import { CollectionsContext } from '@/app/providers/CollectionsProvider'
import { Tag } from '@/types'
import { getCamelCase } from '@/util/styles-helper'

import { SuperScriptElement } from './SuperScriptElement'

export const CheckboxLink = ({ tag }: { tag: Tag }) => {
  const tagId = useId()
  const [isChecked, setIsChecked] = useState(true)
  const {
    collectionFilters,
    highlightCollection,
    setCollectionFilters,
    setHighlightCollection,
    defaultCollectionFilters,
  } = useContext(CollectionsContext)

  const updateCheckbox = useCallback(() => {
    if (!tag.title) return
    if (!isChecked) {
      setCollectionFilters((prev) => prev.filter((col) => col !== tag.title))
    } else {
      setCollectionFilters((prev) => [...prev, tag.title])
    }
    setIsChecked((prev) => !prev)
  }, [collectionFilters, setCollectionFilters, isChecked, tag.title])

  useEffect(() => {
    if (!collectionFilters.includes(tag.title)) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [collectionFilters])

  const selectCollection = useCallback(() => {
    setHighlightCollection(tag.title)
    setCollectionFilters(
      defaultCollectionFilters.filter((col) => col !== tag.title),
    )
  }, [setHighlightCollection, setCollectionFilters, defaultCollectionFilters])

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
        {/* <InternalLink
          href={'/'}
          onClick={() => setSelect()}
          isNav={false}
          key={tag.title}
          tag={tag}
        > */}
        <button onClick={() => selectCollection()}>
          <SuperScriptElement title={getCamelCase(tag.title)} />
        </button>
        {/* </InternalLink> */}
      </label>
    </div>
  )
}
