'use client'

import { Arrow } from './Arrow'
import classNames from 'classnames'
import { NavigationLink } from '@/components/shared/SearchParamLink/client/NavigationLink'
import { NavigationContext } from '@/app/(personal)/[slug]/NavigationProvider'
import { useContext } from 'react'

export interface ArrowNavProps {
  className?: string
}

export function ArrowNav({ className }: ArrowNavProps) {
  let navigationState = useContext(NavigationContext)

  return (
    navigationState && (
      <div
        className={classNames(
          className,
          'grid grid-rows-1 gap-6 py-4 px-10 [&>*]:row-start-1 bg-white',
        )}
      >
        <NavigationLink className="grid" href={`/${navigationState.next}`}>
          <Arrow className="translate-y-[1px] rotate-180 place-self-end" />
        </NavigationLink>
        <NavigationLink className="grid" href={`/${navigationState.prev}`}>
          <Arrow />
        </NavigationLink>
      </div>
    )
  )
}
