import {
  InteractionMode,
  InteractionModeContext,
} from '@/app/(personal)/InteractionModeProvider'
import { useTag } from '@/app/(personal)/TagProvider'
import { ZContext } from '@/app/(personal)/ZProvider'
import classNames from 'classnames'
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

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
  const colorIndex = useRef(0)
  const { interactionMode } = useContext(InteractionModeContext)
  const [rerender, setRerender] = useState(false)
  // const [lastClick, setLastClick] = useState<number>(0)
  const lastClick = useRef(0)
  const tag = useTag()
  console.log(lastClick)

  useEffect(() => {
    if (canvas.current) {
      const handleTouch = (e) => {
        const now = Date.now()
        if (now - lastClick.current > 500) {
          lastClick.current = now
          console.log('a')
          drawCircleTouch(e)
        }
      }

      const handleClick = (e) => {
        const now = Date.now()
        if (now - lastClick.current > 500) {
          lastClick.current = now
          console.log('b')
          drawCircleClick(e)
        }
      }

      const drawCircleClick = (e) => {
        console.log('start', e)
        const ctx = canvas.current?.getContext('2d')
        if (ctx) {
          console.log(colorIndex)
          ctx.beginPath()
          ctx.arc(e.pageX, e.pageY, 20, 0, 2 * Math.PI, false)
          ctx.fillStyle = dotColors[colorIndex.current]
          ctx.fill()
          incrementColorIndex(colorIndex, dotColors)
        }
      }

      const drawCircleTouch = (e) => {
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

      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
      canvas.current.addEventListener('touchstart', handleTouch)
      canvas.current.addEventListener('mousedown', handleClick)

      return () => {
        if (canvas.current) {
          window.removeEventListener('resize', resizeCanvas)
          canvas.current.removeEventListener('touchstart', handleTouch)
          canvas.current.addEventListener('mousedown', handleClick)
        }
      }
    }
  }, [])

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

  // retrigger this every time we change the tag
  const resizeCanvas = () => {
    if (canvas.current) {
      canvas.current.width = window.innerWidth
      // canvas.current.style.background = `black`
      console.log(getFullDocumentHeight())
      canvas.current.height = getFullDocumentHeight()
      setRerender(!rerender)
    }
  }

  useEffect(() => {
    if (canvas.current) {
      canvas.current.style.zIndex = `${z}`
      resizeCanvas()
    }
  }, [tag])

  return (
    <>
      <canvas
        className={classNames(
          interactionMode == InteractionMode.Dot
            ? 'pointer-events-auto'
            : 'pointer-events-none',
          'absolute border border-red-500',
        )}
        ref={canvas}
      />
    </>
  )
}

export default DotsCanvas
