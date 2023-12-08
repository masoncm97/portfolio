'use client'

import { EntryPayload } from '@/types'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface SiblingsProviderProps {
  children: React.ReactNode
  className?: string
  entries: EntryPayload[] | undefined
}
export default function SiblingsProvider({
  children,
  className,
}: SiblingsProviderProps) {
  const [imagePriority, setImagePriority] = useState(false)
  const searchParams = useSearchParams()

  console.log(searchParams)

  // TODO: set the search params to show how the main page was filtered so that we can
  // set the sibling routes to be the correct navigtion
  // if (searchParams && searchParams['tag']) {
  //   gallery = entries?.filter((entry) => {
  //     console.log(
  //       entry.tags?.some((tag) => tag.title === searchParams['tag']),
  //     )
  //     return entry.tags?.some((tag) => tag.title === searchParams['tag'])
  //   })
  // }

  return (
    <div
      className={classNames(className, imagePriority ? 'z-20' : 'z-0')}
      onTouchStart={() => setImagePriority((prev) => !prev)}
    >
      {children}
    </div>
  )
}
