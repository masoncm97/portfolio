import { useEffect, useRef } from 'react'

const useDisableZoom = () => {
  const touches = useRef(0)

  useEffect(() => {
    // const handleTouchStart = (event) => {
    //   console.log('Touch start', event.touches.length) // Debug log
    //   if (touches.current > 1) {
    //     event.preventDefault()
    //   }
    //   touches.current += event.touches.length
    //   console.log('current', touches.current)
    // }

    // const handleTouchEnd = (event) => {
    //   console.log('Touch end', event.changedTouches.length) // Debug log
    //   touches.current -= event.changedTouches.length
    //   console.log('current', touches.current)
    // }

    // window.addEventListener('touchstart', handleTouchStart, { passive: false })
    // window.addEventListener('touchend', handleTouchEnd)

    const wheelHandler = (e) => {
      if (e.ctrlKey) {
        e.preventDefault()
      }
    }
    window.addEventListener('wheel', wheelHandler, { passive: false })

    return () => {
      //   window.removeEventListener('touchstart', handleTouchStart)
      //   window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('wheel', wheelHandler)
    }
  }, [touches])

  return touches
}

export default useDisableZoom
