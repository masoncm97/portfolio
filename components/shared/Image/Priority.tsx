'use client'

import classNames from 'classnames'
import { useState } from 'react'

interface PriorityProps {
  children: React.ReactNode
  className?: string
}
export default function Priority({ children, className }: PriorityProps) {
  const [imagePriority, setImagePriority] = useState(false)
  console.log(imagePriority)
  return (
    <div
      className={classNames(className, imagePriority ? 'z-20' : 'z-0')}
      onTouchStart={() => setImagePriority((prev) => !prev)}
    >
      {children}
    </div>
  )
}
