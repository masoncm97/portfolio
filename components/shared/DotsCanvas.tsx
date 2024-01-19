import { RefObject, useEffect, useRef } from 'react'

interface TouchObject {
  pageX: number
  pageY: number
}

function colorForTouch(touch) {
  console.log(touch.pageY)
  // let r = touch.pageY % 16
  // let g = Math.floor(touch.pageY / 3) % 16
  // let b = Math.floor(touch.pageY / 7) % 16
  let r = 99
  let g = 88
  let b = 66
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
  const color4 = '#75FF33'
  return color4
}

function copyTouch(touch: Touch): TouchObject {
  return { pageX: touch.pageX, pageY: touch.pageY }
}

export function DotsCanvas(props) {
  const ongoingTouches = useRef<TouchObject[]>([])
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvas.current) {
      const handleStart = (e) => {
        console.log('start')
        // e.preventDefault()
        const ctx = canvas.current?.getContext('2d')
        const touches: Touch[] = e.changedTouches
        console.log(touches)
        if (ctx) {
          console.log('ty')
          ctx.fillStyle = '#75FF33'
          // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
          for (let i = 0; i < touches.length; i++) {
            ongoingTouches.current.push(copyTouch(touches[i]))
            const color = colorForTouch(touches[i])
            ctx.beginPath()
            ctx.arc(
              touches[i].pageX,
              touches[i].pageY,
              20,
              0,
              2 * Math.PI,
              false,
            )
            ctx.fillStyle = '#75FF33'
            ctx.fill()
          }
        }
      }

      const handleMove = (e) => {
        console.log('move')
      }

      const handleEnd = (e) => {
        console.log('end')
      }

      const handleCancel = (e) => {
        console.log('cancel')
      }

      canvas.current.addEventListener('touchstart', handleStart)
      canvas.current.addEventListener('touchend', handleEnd)
      canvas.current.addEventListener('touchcancel', handleCancel)
      canvas.current.addEventListener('touchmove', handleMove)

      return () => {
        if (canvas.current) {
          canvas.current.removeEventListener('touchstart', handleStart)
          canvas.current.removeEventListener('touchend', handleEnd)
          canvas.current.removeEventListener('touchcancel', handleCancel)
          canvas.current.removeEventListener('touchmove', handleMove)
        }
      }
    }
  }, [])

  return (
    <div>
      <canvas
        {...props}
        className="z-[1000000000] absolute border border-red-500"
        ref={canvas}
        width={370}
        height={10000}
      />
    </div>
  )
}

export default DotsCanvas
