'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { Header } from '@/components/shared/Header'
import type { HomePagePayload } from '@/types'
import { EntryListItem } from './EntryListItem'
import { SearchParamLink } from '@/components/shared/Links/server/SearchParamLink'
import { shuffle } from '@/util/functions'
import { useEffect } from 'react'

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

  let gallery = entries

  if (searchParams && searchParams['category']) {
    gallery = entries?.filter((entry) => {
      return entry.category?.title === searchParams['category']
    })
  }

  if (searchParams && searchParams['tag']) {
    gallery = entries?.filter((entry) => {
      console.log(entry.tags?.some((tag) => tag.title === searchParams['tag']))
      return entry.tags?.some((tag) => tag.title === searchParams['tag'])
    })
  }

  const queryString = createQueryString(searchParams)

  // gallery = shuffle(gallery)

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
    <div className="space-y-20">
      {title && <Header centered title={title} description={overview} />}
      {gallery && gallery.length > 0 && (
        <div className="mx-auto grid">
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
