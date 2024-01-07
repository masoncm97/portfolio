'use client'

// import Image from 'next/image'
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

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   const target = targetRef.current
  //   if (!canvas || !target) return
  //   const image = new Image()
  //   if (imageUrl) {
  //     image.src = imageUrl
  //     console.log(image.src)
  //     const canvas = canvasRef.current

  //     if (canvas == null) throw new Error('Could not get canvas')

  //     const context = canvas.getContext('2d')

  //     if (context == null) throw new Error('Could not get context')

  //     image.crossOrigin = 'anonymous'

  //     image.onload = () => {
  //       // Now draw the image onto the canvas
  //       console.log('image loaded')
  //       context.drawImage(image, 10, 10, width)

  //       // Your pixelation or other image processing logic can go here
  //     }

  //     // canvas.width = width
  //     // canvas.height = height
  //     // We'll be pixelating the image by 80% (20% of original size).
  //     // var percent = 0.2

  //     // Calculate the scaled dimensions.
  //     // var scaledWidth = width * percent
  //     // var scaledHeight = height * percent

  //     // Render image smaller.
  //     // context!.drawImage(target, 0, 0, scaledWidth, scaledHeight)

  //     // // Stretch the smaller image onto larger context.
  //     // context!.drawImage(
  //     //   target,
  //     //   0,
  //     //   0,
  //     //   scaledWidth,
  //     //   scaledHeight,
  //     //   0,
  //     //   0,
  //     //   width,
  //     //   height,
  //     // )

  //     // Here are what the above parameters mean:
  //     // canvasElement, canvasXOffsetForImage, canvasYOffsetForImage, imageWidth, imageHeight, imageXOffset, imageYOffset, destinationImageWidth, destinationImageHeight

  //     // Append canvas to body.
  //     // document.body.appendChild(canvas)
  //   }
  // }, [])

  return (
    <>
      {imageUrl && (
        // <Image
        //   className="image"
        //   alt={alt}
        //   width={width}
        //   height={height}
        //   sizes={size}
        //   src={imageUrl}
        //   placeholder="blur"
        //   blurDataURL={image?.lqip}
        //   onLoad={(event) => {
        //     const target = event.target

        //     // next/image use an 1x1 px git as placeholder. We only want the onLoad event on the actual image
        //     // if (target.src.indexOf('data:image/gif;base64') < 0) {
        //     //   setImageIsLoaded(true)
        //     // }
        //     setImageIsLoaded(true)
        //   }}
        // />
        <>
          <div className="max-w-lg max-h-lg mx-auto">
            <ImageCanvas imageUrl={imageUrl} maxWidth={500} maxHeight={700} />
          </div>
        </>
      )}
    </>
  )
}
