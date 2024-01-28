import classNames from 'classnames'

import { Orientation, TextSize } from '@/types'

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

export function computeOrientation(
  orientation: Orientation | undefined,
  location: string,
): {
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
        width: 3000,
        height: 4000,
        size: '70vw',
        styles: classNames(
          location === 'Entry' ? 'top-[20%] center-absolute w-[80%]' : 'w-full',
        ),
      }
    case 'Landscape':
      return {
        width: 2000,
        height: 1500,
        size: '100vw',
        styles: classNames(
          location === 'Entry' ? 'top-[25%]' : '',
          'aspect-[4/3] w-full',
        ),
      }
    case 'Square':
      return {
        width: 2000,
        height: 2000,
        size: '100vw',
        styles: classNames(
          location === 'Entry' ? 'top-[25%]' : '',
          'aspect-square w-full',
        ),
      }
    default:
      console.warn('Invalid orientation type', orientation.title)
      return {} as any
  }
}

export function getCamelCase(text: string | undefined): string | undefined {
  if (text) {
    let styledTitle = text
      .split('-')
      .map((val) => val[0].toUpperCase() + val.substring(1))
    return styledTitle.reduce((acc, curr) => acc + ' ' + curr)
  } else {
    return text
  }
}
