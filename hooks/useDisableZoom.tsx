// 'use client'

// import { useEffect, useState } from 'react'

// const useDisableZoom = () => {
//   const [touchCount, setTouchCount] = useState(0)
//   useEffect(() => {
//     console.log('start', touchCount)
//     const handleTouchStart = (e) => {
//       if (touchCount > 0) {
//         e.preventDefault()
//       }
//       setTouchCount((prev) => prev + e.touches.length)
//     }

//     const handleTouchEnd = (e) => {
//       console.log('end', touchCount)
//       setTouchCount((prev) => prev - e.changedTouches.length)
//     }

//     window.addEventListener('touchstart', handleTouchStart, { passive: false })
//     window.addEventListener('touchend', handleTouchEnd)

//     return () => {
//       window.removeEventListener('touchstart', handleTouchStart)
//       window.removeEventListener('touchend', handleTouchEnd)
//     }
//   }, [touchCount])

//   return touchCount
// }

// export default useDisableZoom

import { useEffect, useRef, useState } from 'react'

const useDisableZoom = () => {
  const touches = useRef(0)

  useEffect(() => {
    const handleTouchStart = (event) => {
      console.log('Touch start', event.touches.length) // Debug log
      if (touches.current > 1) {
        event.preventDefault()
      }
      touches.current += event.touches.length
      console.log('current', touches.current)
    }

    const handleTouchEnd = (event) => {
      console.log('Touch end', event.changedTouches.length) // Debug log
      touches.current -= event.changedTouches.length
      console.log('current', touches.current)
    }

    const handleTouchCancel = (event) => {
      console.log('Touch cancel', event.changedTouches.length) // Debug log
      touches.current -= event.changedTouches.length
      console.log('current', touches.current)
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchcancel', handleTouchCancel)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchCancel)
    }
  }, [touches])

  return touches
}

export default useDisableZoom
