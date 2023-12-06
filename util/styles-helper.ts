import { Orientation } from '@/types'
import classNames from 'classnames'

/* Used to ensure that no border is doubled when rendering items in a table
by ensuring that all elements before the last one should not have a bottom (for vertical rendering)
or right (for horizontal rendering) border */

// 'index': index of the element
// 'length': length of the array
// 'columnPriority': true if the table should be rendered vertically, false if horizontally

export function getTableElementStyle(
  index: number,
  length: number,
  columnPriority: boolean = false,
) {
  return classNames(
    'border border-black bg-white',
    columnPriority
      ? index === length - 1
        ? 'border-b-[1px]'
        : 'border-b-0'
      : index === length - 1
        ? 'border-b-[1px] md:border-r-[1px]'
        : 'border-b-0 md:border-b-[1px] md:border-r-0',
  )
}

export function computeOrientation(orientation: Orientation | undefined): {
  width: number
  height: number
  size: string
  styles: string
} {
  if (!orientation) {
    orientation = { _type: 'Orientation', title: 'Landscape' }
  }
  switch (orientation.title) {
    case 'Portrait':
      return {
        width: 2000,
        height: 3500,
        size: '70vw',
        styles: classNames('aspect-[9/16] w-[60%]'),
      }
    case 'Landscape':
      return {
        width: 3500,
        height: 2000,
        size: '100vw',
        styles: classNames('aspect-[16/9] w-full'),
      }
    default:
      console.warn('Invalid orientation type', orientation.title)
      return {} as any
  }
}
