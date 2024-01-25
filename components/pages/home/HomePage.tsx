'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import type { EntryPayload, HomePagePayload } from '@/types'
import { EntryListItem } from './EntryListItem'
import { useEffect, useRef } from 'react'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { useCanvases } from '@/hooks/useCanvases'
import { useScrollToSelected } from '@/hooks/useScrollToSelected'
import { InteractionMode } from '@/app/(personal)/InteractionModeProvider'
import { getParamValue } from '@/util/routes-helper'
import { createContext, useContext } from 'react'
import TagProvider from '@/app/(personal)/TagProvider'

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
  const tagRef = useRef<string | undefined>(tag)
  let filteredEntries = filterEntries(entries, tag)
  const zIndices = getRandomPermutation(filteredEntries.length)
  const topZ = useRef(filteredEntries.length + 1)
  const {
    canvases,
    interactionMode,
    handleDrawClick: handleDotClick,
    handleArrangeClick,
  } = useCanvases(topZ, tag)

  return (
    <TagProvider tag={tag}>
      {filteredEntries && filteredEntries.length > 0 && (
        <div
          ref={ref}
          className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 w-screen min-h-screen relative"
        >
          {canvases.map((element) => element)}
          <div className="z-[1000000001] fixed">
            {interactionMode == InteractionMode.Arrange ? (
              <button onClick={handleDotClick}>Dot</button>
            ) : (
              <button onClick={handleArrangeClick}>Arrange</button>
            )}
          </div>
          {filteredEntries.map((entry, index) => {
            return (
              <EntryListItem
                key={`${tag}:${index}`}
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
  tag: string | undefined,
): EntryPayload[] => {
  if (tag) {
    entries = entries?.filter((entry) => {
      return entry.tags?.some((entryTag) => entryTag.title === tag)
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
