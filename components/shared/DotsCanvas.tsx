import classNames from 'classnames'
import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  InteractionMode,
  InteractionModeContext,
} from '@/app/providers/InteractionModeProvider'
import { useTag } from '@/app/providers/TagProvider'

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

interface DotsCanvas {
  z: number
  tag: string | undefined
}

export function DotsCanvas({ z }: DotsCanvas) {
  const ongoingTouches = useRef<TouchObject[]>([])
  const canvas = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>(undefined)
  const colorIndex = useRef(0)
  const { interactionMode } = useContext(InteractionModeContext)
  const [rerender, setRerender] = useState(false)
  const lastClick = useRef(0)
  const tag = useTag()

  // retrigger this every time we change the tag
  const resizeCanvas = useCallback(() => {
    if (canvas.current) {
      canvas.current.width = window.innerWidth
      canvas.current.height = getFullDocumentHeight()
      setRerender((prev) => !prev)
    }
  }, [])

  useEffect(() => {
    let currentCanvas = canvas.current
    if (currentCanvas) {
      const handleClick = (e) => {
        console.log('1')
        const now = Date.now()
        if (now - lastClick.current > 100) {
          lastClick.current = now
          drawCircleClick(e)
        }
      }

      const drawCircleClick = (e) => {
        console.log('2')
        if (ctx.current) {
          console.log('3')
          ctx.current.beginPath()
          ctx.current.arc(e.pageX, e.pageY, 20, 0, 2 * Math.PI, false)
          ctx.current.fillStyle = dotColors[colorIndex.current]
          ctx.current.fill()
          incrementColorIndex(colorIndex, dotColors)
        }
      }

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      currentCanvas.addEventListener('mousedown', handleClick)

      return () => {
        if (currentCanvas) {
          window.removeEventListener('resize', resizeCanvas)
          currentCanvas.removeEventListener('mousedown', handleClick)
        }
      }
    }
  }, [resizeCanvas])

  useEffect(() => {
    if (canvas.current) {
      ctx.current = canvas.current?.getContext('2d')
    }
  }, [canvas])

  const getFullDocumentHeight = () => {
    const body = document.body
    const html = document.documentElement

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )
  }

  useEffect(() => {
    if (canvas.current) {
      canvas.current.style.zIndex = `${z}`
      resizeCanvas()
    }
  }, [tag, resizeCanvas, z])

  return (
    <canvas
      className={classNames(
        interactionMode == InteractionMode.Dot
          ? 'pointer-events-auto'
          : 'pointer-events-none',
        'absolute border border-red-500',
      )}
      ref={canvas}
    />
  )
}

export default DotsCanvas
