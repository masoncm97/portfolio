'use client'

// TODO:
// refactor to use searchParams instead of query string
// refactor to use entries from NavigationContext instead of props

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { Header } from '@/components/shared/Header'
import type { EntryPayload, HomePagePayload } from '@/types'
import { EntryListItem } from './EntryListItem'
import { SearchParamLink } from '@/components/shared/SearchParamLink/server/SearchParamLink'
import { shuffle } from '@/util/functions'
import { useContext, useEffect, useState } from 'react'
import { NavigationContext } from '@/app/(personal)/[slug]/NavigationProvider'

export interface HomePageProps {
  data: HomePagePayload | null
  searchParams: string | string[] | undefined
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({
  data,
  searchParams,
  encodeDataAttribute,
}: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], entries = [], title = '' } = data ?? {}

  // let gallery = entries

  // const [gallery, setGallery] = useState(entries)
  let navigationContext = useContext(NavigationContext)
  if (!navigationContext) return

  let gallery = navigationContext.navigatableEntries

  useEffect(() => {
    let filteredGallery = entries

    if (searchParams && searchParams['category']) {
      filteredGallery = entries?.filter((entry) => {
        return entry.category?.title === searchParams['category']
      })
    }

    if (searchParams && searchParams['tag']) {
      filteredGallery = entries?.filter((entry) => {
        return entry.tags?.some((tag) => tag.title === searchParams['tag'])
      })
    }

    // setGallery(filteredGallery)
  }, [searchParams, entries])

  const queryString = createQueryString(searchParams)

  const shuffleGallery = () => {
    const shuffled = shuffle([...gallery])
    //  setGallery(shuffled) // Shuffle and set the gallery state
    console.log(gallery)
    navigationContext?.updateNavigatableEntries(shuffled)
  }

  useEffect(() => {
    const lastViewedImageId = sessionStorage.getItem('lastViewedImage')
    console.log(lastViewedImageId)
    if (lastViewedImageId != null) {
      const imageToScrollTo = document.getElementById(lastViewedImageId)
      imageToScrollTo?.scrollIntoView()
      sessionStorage.removeItem('lastViewedImage')
    }
  }, [])

  return (
    <div className="space-y-20 border border-red-600">
      {title && <Header centered title={title} description={overview} />}
      {gallery && gallery.length > 0 && (
        <div className="mx-auto grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
          {gallery.map((entry, key) => {
            return (
              <SearchParamLink
                key={key}
                queryString={queryString}
                pathName={entry.slug}
              >
                <EntryListItem entry={entry} />
              </SearchParamLink>
            )
          })}
        </div>
      )}
      <button
        className="fixed bottom-2 border-red-500 border w-[75px] right-2 h-[75px]"
        onClick={shuffleGallery}
      >
        Shuffle
      </button>
    </div>
  )
}

const createQueryString = (searchParams: string | string[] | undefined) => {
  let queryString = ''
  if (!searchParams) return queryString
  if (typeof searchParams === 'string') return searchParams
  for (const [key, value] of Object.entries(searchParams)) {
    if (queryString !== '') {
      queryString += '&'
    }
    queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  }
  return queryString
}

export default HomePage
