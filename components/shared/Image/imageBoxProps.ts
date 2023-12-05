import { Orientation } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { SanityImageProps } from './SanityImage'

export interface ImageBoxProps {
  imageBox: SanityImageProps
  encodeDataAttribute?: EncodeDataAttributeCallback
  className?: string
  orientation?: Orientation
}
