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
    'border border-black',
    columnPriority
      ? index === length - 1
        ? 'border-b-[1px]'
        : 'border-b-0'
      : index === length - 1
        ? 'border-b-[1px] md:border-r-[1px]'
        : 'border-b-0 md:border-b-[1px] md:border-r-0',
  )
}
