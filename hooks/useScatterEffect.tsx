import { DeviceSize } from '@/types/devices'
import { RefObject, useEffect } from 'react'

export const useScatterEffect = (
  entryRef: RefObject<HTMLDivElement>,
  index: number,
  z: number,
  deviceSize: DeviceSize | undefined,
) => {
  useEffect(() => {
    if (entryRef.current && deviceSize) {
      const boxWidth = getBoxWidth(deviceSize)
      const height = getHeight(deviceSize, index)
      const width = (Math.random() * 2 * boxWidth) / 5
      entryRef.current.style.marginLeft = `${width}px`
      entryRef.current.style.marginRight = `${boxWidth - (width + 240)}px`
      entryRef.current.style.marginTop = `${height}px`
      entryRef.current.style.zIndex = `${z}`
    }
  }, [deviceSize])
}

const getBoxWidth = (deviceSize: DeviceSize): number => {
  let boxWidth = window.innerWidth

  if (deviceSize >= DeviceSize.lg) {
    boxWidth /= 3
    return boxWidth
  }
  if (deviceSize >= DeviceSize.md) {
    boxWidth /= 2
    return boxWidth
  }
  return boxWidth
}

const getHeight = (deviceSize: DeviceSize, index: number): number => {
  let height = Math.random() - 0.5

  if (deviceSize >= DeviceSize.lg) {
    height = height * 500
    if (index < 3) {
      height = Math.abs(height)
    }
    return height
  }
  if (deviceSize >= DeviceSize.md) {
    height = height * 300
    if (index < 2) {
      height = Math.abs(height)
    }
    return height
  }
  if (index === 0) {
    height = Math.abs(height)
  }
  return height
}
