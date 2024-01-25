import { MutableRefObject, RefObject } from 'react'

interface useDragProps {
  entryRef: RefObject<HTMLDivElement>
  containerRef: RefObject<HTMLDivElement>
  linkRef: RefObject<HTMLAnchorElement>
  dragging: MutableRefObject<boolean>
  topZ: MutableRefObject<number>
}
export const useDrag = ({
  entryRef,
  containerRef,
  linkRef,
  dragging,
  topZ,
}: useDragProps) => {
  let touchDownTime = 0
  let touchX = 0
  let touchY = 0

  const handleStartDrag = (e) => {
    touchDownTime = e.timeStamp
    if (e.changedTouches) {
      touchX = e.changedTouches.item(0).clientX
      touchY = e.changedTouches.item(0).clientY
    } else {
      touchX = e.clientX
      touchY = e.clientY
    }
    if (entryRef.current && topZ.current && containerRef.current) {
      containerRef.current.style.zIndex = `${topZ.current}`
      entryRef.current.style.outline = `5px solid yellow`
      topZ.current++
    }
  }

  const handleDrag = (e) => {
    const [deltaX, deltaY] = getDelta(e, touchX, touchY)
    if (deltaX > 3 || deltaY > 3) {
      dragging.current = true
    }
  }

  const handleStopDrag = (e) => {
    const [deltaX, deltaY] = getDelta(e, touchX, touchY)
    if (
      deltaX < 5 &&
      deltaY < 5 &&
      Math.abs(touchDownTime - e.timeStamp) < 200 &&
      linkRef.current
    ) {
      linkRef.current.click()
    }
    if (entryRef.current) {
      entryRef.current.style.outline = `none`
    }

    setTimeout(() => {
      dragging.current = false
    }, 100)
  }

  return { handleStartDrag, handleDrag, handleStopDrag }
}

const getDelta = (e, touchX, touchY) => {
  let stopTouchX, stopTouchY
  if (e.changedTouches) {
    stopTouchX = e.changedTouches.item(0).clientX
    stopTouchY = e.changedTouches.item(0).clientY
  } else {
    stopTouchX = e.clientX
    stopTouchY = e.clientY
  }
  const deltaX = Math.abs(touchX - stopTouchX)
  const deltaY = Math.abs(touchY - stopTouchY)
  return [deltaX, deltaY]
}
