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
  const params = useSearchParams()
  useScrollToSelected(params)
  const filteredEntries = filterEntries(entries, params)
  const zIndices = getRandomPermutation(filteredEntries.length)
  const topZ = useRef(filteredEntries.length + 1)
  const { canvases, handleDrawClick, handleLayerClick } = useCanvases(topZ)

  return (
    <>
      {filteredEntries && filteredEntries.length > 0 && (
        <div ref={ref} className="mx-auto grid w-screen min-h-screen relative">
          <div>{canvases.map((element) => element)}</div>
          <div className="z-[1000000001] fixed">
            <button onClick={handleDrawClick}>Draw</button>
            <button onClick={handleLayerClick}>Layer</button>
          </div>
          {filteredEntries.map((entry, index) => {
            return (
              <EntryListItem
                key={index}
                entry={entry}
                index={index}
                topZ={topZ}
                z={zIndices[index]}
                encodeDataAttribute={encodeDataAttribute}
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

function getRandomPermutation(n: number): number[] {
  // Create an array from 0 to n
  let array = Array.from({ length: n + 1 }, (_, i) => i)

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = n; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

export default HomePage
