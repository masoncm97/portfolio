import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'
import { Orientation } from '@/types'
import classNames from 'classnames'
import SanityImage, { SanityImageProps } from './SanityImage'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { ImageBoxProps } from './imageBoxProps'
import { computeOrientation } from '@/util/styles-helper'
import Priority from './Priority'

export default function EntryImageBox({
  imageBox,
  encodeDataAttribute,
  className,
  orientation,
}: ImageBoxProps) {
  const { width, height, size, orientationValue } =
    computeOrientation(orientation)

  return (
    <Priority
      className={classNames(
        className,
        orientationValue === 'Landscape'
          ? ' aspect-[16/9] w-full'
          : ' aspect-[9/16] top-[20%] w-[70vw]',
        'absolute center-absolute overflow-hidden',
      )}
      data-sanity={imageBox['data-sanity']}
    >
      <SanityImage {...imageBox} width={width} height={height} size={size} />
    </Priority>
  )
}
