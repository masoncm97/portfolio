import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'
import { Orientation } from '@/types'
import classNames from 'classnames'
import SanityImage, { SanityImageProps } from './SanityImage'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import { ImageBoxProps } from './imageBoxProps'
import { computeOrientation } from '@/util/styles-helper'

export default function GalleryImageBox({
  imageBox,
  encodeDataAttribute,
  className,
  orientation,
}: ImageBoxProps) {
  const { width, height, size, orientationValue } =
    computeOrientation(orientation)

  return (
    <div
      className={classNames(
        className,
        orientationValue === 'Landscape'
          ? ' aspect-[16/9] w-full'
          : ' aspect-[9/16] w-[60%]',
        'relative z-0',
      )}
      data-sanity={imageBox['data-sanity']}
    >
      <SanityImage {...imageBox} width={width} height={height} size={size} />
    </div>
  )
}
