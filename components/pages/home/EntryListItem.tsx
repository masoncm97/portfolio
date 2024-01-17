'use client'

import { GalleryImageBox } from '@/components/shared/Image/ImageBox'
import InternalLink from '@/components/shared/InternalLink'
import type { EntryPayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { useRef, useEffect, useState, RefObject, MutableRefObject } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Draggable from 'react-draggable' // The default
import { useContext } from 'react'
import { WrapperContext } from '@/app/(personal)/WrapperProvider'
import classNames from 'classnames'

interface EntryProps {
  entry: EntryPayload
  index: number
  zIndex: MutableRefObject<number>
  parentReference?: RefObject<HTMLDivElement>
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function EntryListItem({
  entry,
  encodeDataAttribute,
  index,
  zIndex,
  parentReference,
}: EntryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true })

  console.log(isInView)
  // const [z, setZ] = useState(0)

  let touchDownTime = 0

  useEffect(() => {
    if (ref.current) {
      let height = (Math.random() - 0.5) * 100
      if (index === 0) {
        height = Math.abs(height)
      }
      const width = (Math.random() * 2 * window.innerWidth) / 5
      const z = Math.ceil((index + 1) * Math.random() * 10)
      ref.current.style.marginLeft = `${width}px`
      ref.current.style.marginTop = `${height}px`
      ref.current.style.zIndex = `${z}`
    }
  }, [])

  const handleStartDrag = (e) => {
    touchDownTime = e.timeStamp
    if (imageRef.current && zIndex.current) {
      imageRef.current.style.zIndex = `${zIndex.current}`
      imageRef.current.style.outline = `5px solid yellow`
      zIndex.current++
    }
  }

  const handleStopDrag = (e) => {
    if (Math.abs(touchDownTime - e.timeStamp) < 200 && linkRef.current) {
      linkRef.current.click()
    }

    if (imageRef.current) {
      imageRef.current.style.outline = `none`
    }
  }

  return (
    <div
      className={classNames(
        entry.orientation?.title == 'Portrait'
          ? 'min-h-[25rem]'
          : 'min-h-[13rem]',
      )}
    >
      <Draggable
        onStart={handleStartDrag}
        onStop={handleStopDrag}
        nodeRef={ref}
      >
        <div ref={ref}>
          <AnimatePresence>
            {isInView && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'tween', duration: 1, delay: 1 }}
                className="max-w-[15rem]"
              >
                <GalleryImageBox
                  imageBox={{
                    image: entry.image,
                    alt: entry.shortDescription
                      ? entry.shortDescription
                      : `Cover image from ${entry.title}`,
                  }}
                  data-sanity={encodeDataAttribute?.('image')}
                  orientation={entry.orientation}
                  slug={entry.slug}
                  linkReference={linkRef}
                  reference={imageRef}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Draggable>
    </div>
  )
}
