'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import type { HomePagePayload } from '@/types'
import { EntryListItem } from './EntryListItem'
import { useEffect } from 'react'
import InternalLink from '@/components/shared/InternalLink'
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
  const { entries = [] } = data ?? {}

  let gallery = entries

  if (searchParams && searchParams['tag']) {
    gallery = entries?.filter((entry) => {
      return entry.tags?.some((tag) => tag.title === searchParams['tag'])
    })
  }

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
              <InternalLink key={key} href={entry.slug} isNav={false}>
                <EntryListItem
                  entry={entry}
                  encodeDataAttribute={encodeDataAttribute}
                />
              </InternalLink>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HomePage
