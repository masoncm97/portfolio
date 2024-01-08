import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'

interface ImageCanvasProps {
  imageUrl: string // URL of the image to be displayed
  maxWidth: number // Maximum width for the canvas
  maxHeight: number // Maximum height for the canvas
}

const ImageCanvas: React.FC<ImageCanvasProps> = ({
  imageUrl,
  maxWidth,
  maxHeight,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [imgRatio, setImgRatio] = useState<number>(0)
  const [pxIndex, setPxIndex] = useState<number>(0)
  const viewRef = useRef(null)
  const isInView = useInView(viewRef, { once: true })

  const pxFactorValues = [1, 2, 4, 9, 100]

  const renderImage = (factor: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      const img = new Image()
      let pxFactor = pxFactorValues[pxIndex]
      const size = pxFactor * 0.01

      // Turn off image smoothing to achieve the pixelated effect
      // ctx.mozImageSmoothingEnabled = size === 1 ? true : false
      // ctx.webkitImageSmoothingEnabled = size === 1 ? true : false
      //   ctx.imageSmoothingEnabled = false

      img.onload = () => {
        var percent = factor / 100

        // Calculates the scale factor to resize the image so that it fits
        // within the specified maxWidth and maxHeight while maintaining its aspect ratio.
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height)

        // maxWidth / 2 finds the midpoint of the canvas's width
        // (img.width / 2) * scale finds the midpoint of the scaled image's width.
        // Subtracting the scaled image's midpoint from the canvas's midpoint effectively centers the image on the canvas.
        const x = maxWidth / 2 - (img.width / 2) * scale

        if (canvas == null) throw new Error('Could not get canvas')

        canvas.style.cssText =
          'image-rendering: optimizeSpeed;' + // FireFox < 6.0
          'image-rendering: -moz-crisp-edges;' + // FireFox
          'image-rendering: -o-crisp-edges;' + // Opera
          'image-rendering: -webkit-crisp-edges;' + // Chrome
          'image-rendering: crisp-edges;' + // Chrome
          'image-rendering: -webkit-optimize-contrast;' + // Safari
          'image-rendering: pixelated; ' + // Future browsers
          '-ms-interpolation-mode: nearest-neighbor;' // IE

        // console.log('scale', img.width, img.height, scale, percent)
        var scaledWidth = img.width * scale * percent
        var scaledHeight = img.height * scale * percent

        canvas.width = maxWidth
        canvas.height = maxHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, x, 0, scaledWidth, scaledHeight)

        ctx.imageSmoothingEnabled = size === 1 ? true : false

        ctx.drawImage(
          canvas,
          0,
          0,
          scaledWidth,
          scaledHeight,
          0,
          0,
          maxWidth,
          maxHeight,
        )
      }
      img.src = imageUrl
    }
  }

  const animatePixels = (index: number) => {
    if (index < pxFactorValues.length) {
      setTimeout(
        () => {
          renderImage(pxFactorValues[index])
          animatePixels(index + 1)
        },
        index === 0 ? 300 : 80,
      )
    }
  }

  useEffect(() => {
    animatePixels(0)
  }, [isInView])

  return (
    <div className="h-full grid place-items-center" ref={viewRef}>
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'tween', duration: 0.5, delay: 0.5 }}
            className={classNames('border border-red-500 w-full h-full')}
          >
            <canvas ref={canvasRef} className="w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ImageCanvas
