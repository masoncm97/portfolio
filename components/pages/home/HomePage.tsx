'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import type { HomePagePayload } from '@/types'
import { EntryListItem } from './EntryListItem'
import { SearchParamLink } from '@/components/shared/Links/server/SearchParamLink'
import { useEffect } from 'react'
import InternalLink from '@/components/shared/Links/InternalLink'
import { useSearchParams } from 'next/navigation'

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

  const params = useSearchParams()
  const tagParam = params
    .toString()
    .split('&')
    .find((param) => param.includes('nav'))

  useEffect(() => {
    const lastViewedImageId = sessionStorage.getItem('lastViewedImage')
    console.log(lastViewedImageId)
    if (lastViewedImageId != null && !tagParam) {
      const imageToScrollTo = document.getElementById(lastViewedImageId)
      imageToScrollTo?.scrollIntoView()
      sessionStorage.removeItem('lastViewedImage')
    }
  }, [])

  return (
    <div className="space-y-20">
      {gallery && gallery.length > 0 && (
        <div className="mx-auto grid">
          {gallery.map((entry, key) => {
            return (
              <InternalLink key={key} pathName={entry.slug} isNav={false}>
                <EntryListItem entry={entry} />
              </InternalLink>
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
