'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import type { EntryPayload, HomePagePayload } from '@/types'
import { EntryListItem } from './EntryListItem'
import { useRef } from 'react'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { useCanvases } from '@/hooks/useCanvases'
import { useScrollToSelected } from '@/hooks/useScrollToSelected'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  let { entries = [] } = data ?? {}
  const ref = useRef<HTMLDivElement>(null)
  const zIndex = useRef(1000)
  const params = useSearchParams()
  const { canvases, handleDrawClick, handleLayerClick } = useCanvases()
  useScrollToSelected(params)
  filterEntries(entries, params)
  return (
    <>
      {entries && entries.length > 0 && (
        <div ref={ref} className="mx-auto grid w-screen min-h-screen relative">
          <div>{canvases.map((element) => element)}</div>
          <div className="z-[1000000001] fixed">
            <button onClick={handleDrawClick}>Draw</button>
            <button onClick={handleLayerClick}>Layer</button>
          </div>
          {entries.map((entry, index) => {
            return (
              <EntryListItem
                key={index}
                entry={entry}
                index={index}
                zIndex={zIndex}
                encodeDataAttribute={encodeDataAttribute}
                parentReference={ref}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

const filterEntries = (
  entries: EntryPayload[],
  params: ReadonlyURLSearchParams,
): EntryPayload[] => {
  if (params && params['tag']) {
    entries = entries?.filter((entry) => {
      return entry.tags?.some((tag) => tag.title === params['tag'])
    })
  }
  return entries
}

export default HomePage
