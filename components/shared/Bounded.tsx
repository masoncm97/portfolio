import React from 'react'
import classnames from 'classnames'
import classNames from 'classnames'

type BoundedProps = {
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

export default function Bounded({
  as: Comp = 'section',
  className,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={classNames(className, 'py-4 sm:py-5 sm:px-6')}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  )
}
