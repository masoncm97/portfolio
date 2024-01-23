import {
  InteractionMode,
  InteractionModeContext,
} from '@/app/(personal)/InteractionModeProvider'
import classNames from 'classnames'
import { MutableRefObject, useContext, useEffect, useRef } from 'react'

interface TouchObject {
  pageX: number
  pageY: number
}

function copyTouch(touch: Touch): TouchObject {
  return { pageX: touch.pageX, pageY: touch.pageY }
}

const dotColors = [
  '#EE4439',
  '#3367FF',
  '#FFF933',
  '#8803E9',
  '#F99E03',
  '#129317',
]

const incrementColorIndex = (
  colorIndex: MutableRefObject<number>,
  dotColors: string[],
) => {
  if (colorIndex.current === dotColors.length - 1) {
    colorIndex.current = 0
  } else {
    colorIndex.current += 1
  }
}

export function DotsCanvas(props) {
  const ongoingTouches = useRef<TouchObject[]>([])
  const canvas = useRef<HTMLCanvasElement>(null)
  const colorIndex = useRef(0)
  const { interactionMode } = useContext(InteractionModeContext)

  useEffect(() => {
    if (canvas.current) {
      const handleStart = (e) => {
        const ctx = canvas.current?.getContext('2d')
        const touches: Touch[] = e.changedTouches
        if (ctx) {
          for (let i = 0; i < touches.length; i++) {
            ongoingTouches.current.push(copyTouch(touches[i]))
            ctx.beginPath()
            ctx.arc(
              touches[i].pageX,
              touches[i].pageY,
              20,
              0,
              2 * Math.PI,
              false,
            )
            ctx.fillStyle = dotColors[colorIndex.current]
            ctx.fill()
            incrementColorIndex(colorIndex, dotColors)
          }
        }
      }

      canvas.current.addEventListener('touchstart', handleStart)

      return () => {
        if (canvas.current) {
          canvas.current.removeEventListener('touchstart', handleStart)
        }
      }
    }
  }, [])

  return (
    <>
      <canvas
        {...props}
        className={classNames(
          interactionMode == InteractionMode.Draw
            ? 'pointer-events-auto'
            : 'pointer-events-none',
          'z-[1000000000] absolute border border-red-500 ',
        )}
        ref={canvas}
        width={370}
        height={10000}
      />
    </>
  )
}

export default DotsCanvas
