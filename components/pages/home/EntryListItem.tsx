'use client'

import { GalleryImageBox } from '@/components/shared/Image/ImageBox'
import InternalLink from '@/components/shared/InternalLink'
import type { EntryPayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import {
  useRef,
  useEffect,
  useState,
  RefObject,
  MutableRefObject,
  memo,
} from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Draggable from 'react-draggable' // The default
import classNames from 'classnames'

export interface EntryProps {
  entry: EntryPayload
  index: number
  zIndex: MutableRefObject<number>
  parentReference?: RefObject<HTMLDivElement>
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export const EntryListItem = memo(function EntryListItem({
  entry,
  encodeDataAttribute,
  index,
  zIndex,
  parentReference,
}: EntryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const ref4 = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(ref, { once: true })

  // const [z, setZ] = useState(0)

  let touchDownTime = 0
  let touchX = 0
  let touchY = 0

  useEffect(() => {
    if (ref.current && ref3.current) {
      let height = (Math.random() - 0.5) * 100
      if (index === 0) {
        height = Math.abs(height)
      }
      const width = (Math.random() * 2 * window.innerWidth) / 5
      const z = Math.ceil((index + 1) * Math.random() * 10)
      ref.current.style.marginLeft = `${width}px`
      ref.current.style.marginRight = `${window.innerWidth - (width + 240)}px`
      ref.current.style.marginTop = `${height}px`
      ref.current.style.zIndex = `${z}`
      // console.log(
      //   'left',
      //   window.innerWidth -
      //     (width + ref3.current.getBoundingClientRect().width),
      // )
      // console.log('rect', ref3.current.getBoundingClientRect())
      // console.log('innerWidth', window.innerWidth)
      // console.log('right', width)
    }
  }, [imageRef])

  const handleStartDrag = (e) => {
    touchDownTime = e.timeStamp
    // console.log(e.changedTouches.item(0))
    if (e.changedTouches) {
      touchX = e.changedTouches.item(0).clientX
      touchY = e.changedTouches.item(0).clientY
    }
    // console.log(e.changedTouches.item(0).clientX)
    // console.log(e.changedTouches.item(0).clientY)
    if (ref.current && zIndex.current && imageRef.current && ref4.current) {
      // console.log(zIndex.current)
      ref4.current.style.zIndex = `${zIndex.current}`
      imageRef.current.style.outline = `5px solid yellow`
      zIndex.current++
    }
  }

  const handleStopDrag = (e) => {
    // console.log(e.changedTouches.item(0))
    // console.log(e.changedTouches.item(0).clientY)
    // let touch: Touch = new Touch()
    if (e.changedTouches) {
      const stopTouchX = e.changedTouches.item(0).clientX
      const stopTouchY = e.changedTouches.item(0).clientY

      const deltaX = Math.abs(touchX - stopTouchX)
      const deltaY = Math.abs(touchY - stopTouchY)

      if (
        deltaX < 5 &&
        deltaY < 5 &&
        Math.abs(touchDownTime - e.timeStamp) < 200 &&
        linkRef.current
      ) {
        linkRef.current.click()
      }
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
        'relative',
      )}
      id={entry.slug}
      ref={ref4}
    >
      <Draggable
        onStart={handleStartDrag}
        onStop={handleStopDrag}
        nodeRef={ref}
      >
        <div ref={ref} className="flex mr-auto">
          <div ref={ref3} className="flex width-full">
            <AnimatePresence>
              {isInView && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'tween', duration: 1, delay: 1 }}
                  className="max-w-[15rem]"
                >
                  <InternalLink
                    href={entry.slug}
                    isNav={false}
                    className={'m-auto overflow-hidden'}
                    reference={linkRef}
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
                  </InternalLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Draggable>
    </div>
  )
})
