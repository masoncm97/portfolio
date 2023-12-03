'use client'

import classNames from 'classnames'

export interface ArrowProps {
  className?: string
  onClick?: () => void
}

export function Arrow({ className, onClick }: ArrowProps) {
  const arrowStyle = 'absolute h-[1px] bg-black'
  const arrowPoint = 'w-4 translate-x-[180%]'

  return (
    <div
      className={classNames(className, 'relative max-w-[4rem] h-[30px]')}
      onClick={onClick}
    >
      <div
        className={classNames(arrowStyle, arrowPoint, 'rotate-45 top-[25%]')}
      />
      <div
        className={classNames(
          arrowStyle,
          arrowPoint,
          '-rotate-45 bottom-[25%]',
        )}
      />
      <div className={classNames(arrowStyle, 'w-6  top-[50%]')} />
    </div>
  )
}
