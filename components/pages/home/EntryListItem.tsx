import { GalleryImageBox } from '@/components/shared/Image/ImageBox'
import InternalLink from '@/components/shared/InternalLink'
import type { EntryPayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { useRef, RefObject, MutableRefObject, memo } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Draggable from 'react-draggable'
import classNames from 'classnames'
import { useDrag } from '@/hooks/useDrag'
import { useScatterEffect } from '@/hooks/useScatterEffect'

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
}: EntryProps) {
  const entryRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(entryRef, { once: true })
  const { handleStartDrag, handleStopDrag } = useDrag({
    entryRef,
    containerRef,
    linkRef,
    zIndex,
  })
  useScatterEffect(entryRef, index)

  return (
    <Draggable
      handle=".image"
      onStart={handleStartDrag}
      onStop={handleStopDrag}
      nodeRef={containerRef}
    >
      <div
        className={classNames(
          entry.orientation?.title == 'Portrait'
            ? 'min-h-[25rem]'
            : 'min-h-[13rem]',
          'pointer-events-none',
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
                  reference={linkRef}
                >
                  <GalleryImageBox
                    className=".image pointer-events-auto"
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
