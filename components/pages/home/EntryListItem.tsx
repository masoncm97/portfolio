import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import classNames from 'classnames'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { memo, MutableRefObject, RefObject, useRef } from 'react'
import Draggable from 'react-draggable'

import { GalleryImageBox } from '@/components/shared/Image/ImageBox'
import InternalLink from '@/components/shared/InternalLink'
import useDeviceSize from '@/hooks/useDeviceSize'
import { useDrag } from '@/hooks/useDrag'
import { useScatterEffect } from '@/hooks/useScatterEffect'
import type { EntryPayload } from '@/types'

export interface EntryProps {
  entry: EntryPayload
  index: number
  topZ: MutableRefObject<number>
  z: number
  parentReference?: RefObject<HTMLDivElement>
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export const EntryListItem = memo(function EntryListItem({
  entry,
  encodeDataAttribute,
  index,
  topZ,
  z,
}: EntryProps) {
  const entryRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const dragging = useRef<boolean>(false)
  const isInView = useInView(entryRef, { once: true })
  const { handleStartDrag, handleDrag, handleStopDrag } = useDrag({
    entryRef,
    containerRef,
    linkRef,
    dragging,
    topZ,
  })
  const deviceSize = useDeviceSize()
  useScatterEffect(entryRef, index, z, deviceSize)
  return (
    <Draggable
      handle=".image"
      onStart={handleStartDrag}
      onStop={handleStopDrag}
      onDrag={handleDrag}
      nodeRef={containerRef}
    >
      <div
        className={classNames(
          entry.orientation?.title == 'Portrait'
            ? 'min-h-[25rem]'
            : 'min-h-[13rem]',
          'pointer-events-none cursor-auto',
        )}
        id={entry.slug}
        ref={containerRef}
      >
        <div ref={entryRef} className="flex mr-auto">
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
                  index={index}
                  onClick={(e) => {
                    if (dragging.current) {
                      e.preventDefault()
                    }
                  }}
                  reference={linkRef}
                >
                  <GalleryImageBox
                    className=".image pointer-events-auto cursor-move"
                    imageBox={{
                      image: entry.image,
                      alt: entry.shortDescription
                        ? entry.shortDescription
                        : `Cover image from ${entry.title}`,
                    }}
                    data-sanity={encodeDataAttribute?.('image')}
                    orientation={entry.orientation}
                  />
                </InternalLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Draggable>
  )
})
