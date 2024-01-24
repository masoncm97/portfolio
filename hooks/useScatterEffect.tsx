import { RefObject, useEffect } from 'react'

export const useScatterEffect = (
  entryRef: RefObject<HTMLDivElement>,
  index: number,
  z: number,
) => {
  useEffect(() => {
    if (entryRef.current) {
      let height = (Math.random() - 0.5) * 100
      if (index === 0) {
        height = Math.abs(height)
      }
      const width = (Math.random() * 2 * window.innerWidth) / 5
      // const z = Math.ceil((index + 1) * Math.random() * 10)
      entryRef.current.style.marginLeft = `${width}px`
      entryRef.current.style.marginRight = `${
        window.innerWidth - (width + 240)
      }px`
      entryRef.current.style.marginTop = `${height}px`
      entryRef.current.style.zIndex = `${z}`
    }
  }, [])
}
