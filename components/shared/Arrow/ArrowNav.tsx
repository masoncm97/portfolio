'use client'

import classNames from 'classnames'
import { useContext } from 'react'

// import { NavigationLink } from '@/components/shared/Links/client/NavigationLink'
import { NavigationContext } from '@/app/(personal)/[slug]/NavigationProvider'

import InternalLink from '../InternalLink'
import { Arrow } from './Arrow'

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
        <InternalLink
          className="grid"
          href={`/${navigationState.next}`}
          isNav={false}
        >
          <Arrow className="translate-y-[1px] rotate-180 place-self-end" />
        </InternalLink>
        <InternalLink
          className="grid"
          href={`/${navigationState.prev}`}
          isNav={false}
        >
          <Arrow />
        </InternalLink>
      </div>
    )
  )
}
