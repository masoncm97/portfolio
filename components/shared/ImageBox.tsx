import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'
import { Orientation } from '@/types'
import classNames from 'classnames'

interface ImageBoxProps {
  image?: { asset?: any; lqip?: string }
  orientation?: Orientation
  alt?: string
  width?: number
  height?: number
  size?: string
  className?: string
  'data-sanity'?: string
}

export default function ImageBox({
  image,
  orientation,
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  className,
  ...props
}: ImageBoxProps) {
  let orientationValue = orientation?.title
  if (orientationValue && orientationValue === 'Portrait') {
    width = 2000
    height = 3500
    size = '70vw'
  } else {
    orientationValue = 'Landscape'
  }

  const imageUrl =
    image && urlForImage(image)?.height(height).width(width).url()

  return (
    <div
      className={classNames(
        className,
        orientationValue === 'Landscape'
          ? ' aspect-[16/9] w-full top-[30%]'
          : ' aspect-[9/16] w-[70vw] top-[20%] z-0',
        'z-0 center-absolute overflow-hidden top-[30%]',
      )}
      data-sanity={props['data-sanity']}
    >
      {imageUrl && (
        <Image
          className="absolute"
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
          placeholder="blur"
          blurDataURL={image?.lqip}
        />
      )}
    </div>
  )
}
