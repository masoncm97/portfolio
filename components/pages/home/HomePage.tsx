'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import type { HomePagePayload } from '@/types'
import { EntryListItem } from './EntryListItem'
import { useEffect, useRef, useState } from 'react'
import InternalLink from '@/components/shared/InternalLink'
import { useSearchParams } from 'next/navigation'
import useDisableZoom from '@/hooks/useDisableZoom'
import useDrawDots, { DotsCanvas } from '@/hooks/DotsCanvas'

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
  const ref = useRef<HTMLDivElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const zIndex = useRef(1000)
  let gallery = entries
  // useDisableZoom()
  // useDrawDots(canvas)

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
      imageToScrollTo?.scrollIntoView({ block: 'center' })
      sessionStorage.removeItem('lastViewedImage')
    }
  }, [])

  return (
    <>
      {gallery && gallery.length > 0 && (
        <div ref={ref} className="mx-auto grid w-screen min-h-screen relative">
          <DotsCanvas />
          {gallery.map((entry, index) => {
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

export default HomePage
