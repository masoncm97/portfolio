import { DeviceSize } from '@/types/devices'

import useWindowDimensions from './useWindowDimensions'

const useDeviceSize = (): DeviceSize | undefined => {
  const { width } = useWindowDimensions()

  if (!width) {
    return undefined
  }
  const sortedSizes = Object.keys(DeviceSize)
    .filter((key) => !isNaN(Number(DeviceSize[key])))
    .sort((a, b) => DeviceSize[a] - DeviceSize[b])

  for (const size of sortedSizes) {
    if (width <= DeviceSize[size]) {
      return DeviceSize[size] as DeviceSize
    }
  }

  console.log()
  return DeviceSize.xl
}

export default useDeviceSize
