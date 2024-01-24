import { MutableRefObject, RefObject } from 'react'

interface useDragProps {
  entryRef: RefObject<HTMLDivElement>
  containerRef: RefObject<HTMLDivElement>
  linkRef: RefObject<HTMLAnchorElement>
  topZ: MutableRefObject<number>
}
export const useDrag = ({
  entryRef,
  containerRef,
  linkRef,
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
    }
    if (entryRef.current && topZ.current && containerRef.current) {
      containerRef.current.style.zIndex = `${topZ.current}`
      entryRef.current.style.outline = `5px solid yellow`
      topZ.current++
    }
  }

  const handleStopDrag = (e) => {
    if (e.changedTouches) {
      const stopTouchX = e.changedTouches.item(0).clientX
      const stopTouchY = e.changedTouches.item(0).clientY

      const deltaX = Math.abs(touchX - stopTouchX)
      const deltaY = Math.abs(touchY - stopTouchY)
      console.log(linkRef)
      if (
        deltaX < 5 &&
        deltaY < 5 &&
        Math.abs(touchDownTime - e.timeStamp) < 200 &&
        linkRef.current
      ) {
        console.log('ye')
        linkRef.current.click()
      }
    }

    if (entryRef.current) {
      entryRef.current.style.outline = `none`
    }
  }

  return { handleStartDrag, handleStopDrag }
}
