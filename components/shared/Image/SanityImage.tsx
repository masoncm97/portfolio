'use client'

import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'
import { decode } from 'blurhash'
import { useEffect, useRef, useState } from 'react'
import Pixelate from 'pixelate'
import ImageCanvas from './ImageCanvas'

export interface SanityImageProps {
  image?: { asset?: any; lqip?: string; blurHash?: string }
  width?: number
  height?: number
  size?: string
  alt?: string
}

export default function SanityImage({
  image,
  width = 2000,
  height = 1500,
  size,
  alt = 'Cover image',
}: SanityImageProps) {
  // width = 2000
  // height = 1500
  // console.log(width)
  // console.log(height)
  const imageUrl =
    image && urlForImage(image)?.height(height).width(width).url()

  // console.log(image)
  const [imageIsLoaded, setImageIsLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const targetRef = useRef<HTMLImageElement>(null)

  return (
    <>
      {imageUrl && (
        <Image
          className="image"
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
