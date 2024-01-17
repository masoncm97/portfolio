'use client'

import { GalleryImageBox } from '@/components/shared/Image/ImageBox'
import InternalLink from '@/components/shared/InternalLink'
import type { EntryPayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { useRef, useEffect, useState, RefObject } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Draggable from 'react-draggable' // The default
import { useContext } from 'react'
import { WrapperContext } from '@/app/(personal)/WrapperProvider'

interface EntryProps {
  entry: EntryPayload
  index: number
  parentReference?: RefObject<HTMLDivElement>
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function EntryListItem({
  entry,
  encodeDataAttribute,
  index,
  parentReference,
}: EntryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const isInView = useInView(linkRef, { once: true })

  // const [z, setZ] = useState(0)

  const z = useRef(1000)
  const nodeRef = useRef(null)

  // const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  // // Set the drag hook and define component movement based on gesture data
  // const bind = useDrag(({ movement: [mx, my] }) => {
  //   api.start({ x: mx * 10, y: my * 10 })
  // })

  const wrapper = useContext(WrapperContext)

  useEffect(() => {
    if (ref.current) {
      console.log('adjusting')
      const height = index * 200
      const width = (Math.random() * 1.5 * window.innerWidth) / 5
      const z = Math.ceil((index + 1) * Math.random() * 10)
      console.log(width)
      ref.current.style.top = `${height}px`
      ref.current.style.left = `${width}px`
      ref.current.style.zIndex = `${z}`
    }
  }, [])

  const handleStartDrag = () => {
    console.log(wrapper)
    if (ref.current && z.current && imageRef.current && wrapper) {
      console.log('start drag')
      ref.current.style.zIndex = `${z.current}`
      imageRef.current.style.border = `5px solid yellow`
      wrapper.style.overflowY = 'hidden'
      z.current++
    }
  }

  const handleStopDrag = () => {
    if (imageRef.current && wrapper) {
      imageRef.current.style.border = `none`
      wrapper.style.overflowY = 'scroll'
      wrapper.style.overflowX = 'hidden'
    }
  }

  return (
    <Draggable onStart={handleStartDrag} onStop={handleStopDrag} nodeRef={ref}>
      <div className="relative" ref={ref}>
        <InternalLink
          href={entry.slug}
          isNav={false}
          className={'absolute w-[60%] h-full xl:w-9/12'}
          reference={linkRef}
        >
          <AnimatePresence>
            {isInView && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'tween', duration: 0.5, delay: 1 }}
              >
                <GalleryImageBox
                  imageBox={{
                    image: entry.image,
                    alt: entry.shortDescription
                      ? entry.shortDescription
                      : `Cover image from ${entry.title}`,
                  }}
                  data-sanity={encodeDataAttribute?.('image')}
                  className="place-self-center"
                  orientation={entry.orientation}
                  reference={imageRef}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </InternalLink>
      </div>
    </Draggable>
  )
}
