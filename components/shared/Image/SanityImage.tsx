import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'

export interface SanityImageProps {
  image?: { asset?: any; lqip?: string }
  width?: number
  height?: number
  size?: string
  alt?: string
}

export default function SanityImage({
  image,
  width = 3500,
  height = 2000,
  size,
  alt = 'Cover image',
}: SanityImageProps) {
  const imageUrl =
    image && urlForImage(image)?.height(height).width(width).url()

  return (
    <>
      {imageUrl && (
        <Image
          className=""
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
          placeholder="blur"
          blurDataURL={image?.lqip}
        />
      )}
    </>
  )
}
