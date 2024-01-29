import classNames from 'classnames'
import { useCallback, useContext, useState } from 'react'

import { TextSize } from '@/types'
import { getCamelCase } from '@/util/styles-helper'

import TextElement from '../TextElement'
import { SuperScriptElement } from './SuperScriptElement'
import { CollectionsContext } from '@/app/providers/CollectionsProvider'
import { useRouter } from 'next/navigation'
import tag from '@/sanity/schemas/documents/tag'

interface EntryHeaderProps {
  title?: string
  body?: string
}
export const EntryHeader = ({ title, body }: EntryHeaderProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const heading = getCamelCase(title)
  const {
    collectionFilters,
    defaultCollectionFilters,
    highlightCollection,
    setCollectionFilters,
    setHighlightCollection,
  } = useContext(CollectionsContext)

  const closeEntryHeader = useCallback(() => {
    console.log('p', defaultCollectionFilters)
    setCollectionFilters([])
    setIsOpen((prev) => !prev)
  }, [setCollectionFilters])

  return (
    <div
      className={classNames(
        isOpen ? 'block' : 'hidden',
        'grid grid-cols-1 p-2 gap-y-2',
      )}
    >
      {heading && (
        <button className="flex" onClick={() => closeEntryHeader()}>
          <SuperScriptElement
            title={heading}
            size={TextSize.xl}
            superScript={'[x]'}
          />
        </button>
      )}
      <TextElement
        size={TextSize.sm}
        className={classNames(
          isOpen ? 'block' : 'hidden',
          'gap-x-3 gap text-end max-w-[90%] justify-self-end',
        )}
      >
        {body}
      </TextElement>
    </div>
  )
}
