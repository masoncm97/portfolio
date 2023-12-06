import SanityImage, { SanityImageProps } from './SanityImage'
import { computeOrientation } from '@/util/styles-helper'
import Priority from './Priority'
import { Orientation } from '@/types'
import classNames from 'classnames'

export interface ImageBoxProps {
  imageBox: SanityImageProps
  className?: string
  orientation?: Orientation
}

export function EntryImageBox({
  imageBox,
  className,
  orientation,
}: ImageBoxProps) {
  const { width, height, size, styles } = computeOrientation(orientation)

  return (
    <Priority
      className={classNames(className, styles, 'absolute overflow-hidden')}
      data-sanity={imageBox['data-sanity']}
    >
      <SanityImage {...imageBox} width={width} height={height} size={size} />
    </Priority>
  )
}

export function GalleryImageBox({
  imageBox,
  className,
  orientation,
}: ImageBoxProps) {
  const { width, height, size, styles } = computeOrientation(orientation)

  return (
    <div
      className={classNames(className, styles, 'relative z-0')}
      data-sanity={imageBox['data-sanity']}
    >
      <SanityImage {...imageBox} width={width} height={height} size={size} />
    </div>
  )
}
