'use client'

import { EntryPayload } from '@/types'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface NavigationProviderProps {
  children: React.ReactNode
  className?: string
  entries: EntryPayload[] | undefined
}
export default function NavigationProvider({
  children,
  className,
  entries,
}: NavigationProviderProps) {
  const [imagePriority, setImagePriority] = useState(false)
  const searchParams = useSearchParams()
  const navigatableEntries: EntryPayload[] = []

  for (const key of searchParams.keys()) {
    console.log(key)
    console.log(searchParams.get(key))
    const filteredEntries = entries?.filter((entry) => {
      // console.log(key)
      // if (entry.tags)
      //   console.log('yes', entry.tags[0].title === searchParams.get(key))
      entry.tags?.some((tag) => tag.title === searchParams.get(key))
    })
    // console.log('shit', filteredEntries1)
    // const filteredEntries = entries?.filter((entry) => {
    //   entry.tags?.some((tag) => tag.title === key) ||
    //     entry.category?.title === key
    // })
    console.log('yes', filteredEntries)
    if (filteredEntries) {
      navigatableEntries.push(...filteredEntries)
    }
  }
  console.log(entries)
  console.log(navigatableEntries)

  return (
    <div
      className={classNames(className, imagePriority ? 'z-20' : 'z-0')}
      onTouchStart={() => setImagePriority((prev) => !prev)}
    >
      {children}
    </div>
  )
}
