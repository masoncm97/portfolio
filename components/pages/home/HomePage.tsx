'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useContext } from 'react'

import { CollectionsContext } from '@/app/providers/CollectionsProvider'
import TagProvider from '@/app/providers/TagProvider'
import { useCanvases } from '@/hooks/useCanvases'
import { useScrollToSelected } from '@/hooks/useScrollToSelected'
import type { EntryPayload, HomePagePayload } from '@/types'
import { getParamValue } from '@/util/routes-helper'

import { EntryListItem } from './EntryListItem'
import { InteractionModeButton } from './InteractionModeButton'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  let { entries = [] } = data ?? {}
  const ref = useRef<HTMLDivElement>(null)
  const params = useSearchParams()
  useScrollToSelected(params)
  const tag = getParamValue(params, 'tag')
  const { collectionFilters } = useContext(CollectionsContext)
  let filteredEntries = filterEntries(entries, collectionFilters)
  const zIndices = getRandomPermutation(filteredEntries.length)
  const topZ = useRef(filteredEntries.length + 1)
  const {
    canvases,
    interactionMode,
    handleDrawClick: handleDotClick,
    handleArrangeClick,
  } = useCanvases(topZ, tag)

  useEffect(() => {
    filteredEntries = filterEntries(entries, collectionFilters)
  }, [collectionFilters])

  return (
    <TagProvider tag={tag}>
      {filteredEntries && filteredEntries.length > 0 && (
        <div
          ref={ref}
          className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 w-screen min-h-screen relative"
        >
          {canvases.map((element) => element)}
          <InteractionModeButton
            interactionMode={interactionMode}
            handleDotClick={handleDotClick}
            handleArrangeClick={handleArrangeClick}
          />
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
    </TagProvider>
  )
}

const filterEntries = (
  entries: EntryPayload[],
  filters: string[],
): EntryPayload[] => {
  entries = entries?.filter(
    (entry) =>
      !entry.tags?.every((entryTag) => filters.includes(entryTag.title)),
  )

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
