'use client'

import { resolveHref } from '@/sanity/lib/utils'
import { isSearchParam } from '@/util/type-guards'
import classNames from 'classnames'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Tag } from '@/types'

export interface InternalLinkProps {
  tag?: Tag
  className?: string
  href?: string
  isNav: boolean
  isBase?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export default function InternalLink({
  tag,
  className,
  href,
  isNav,
  isBase = false,
  onClick,
  children,
}: InternalLinkProps) {
  const searchParams = useSearchParams()

  const tagParam = searchParams
    .toString()
    .split('&')
    .find((param) => param.includes('tag'))

  const computeHref = (tag: Tag | undefined): string => {
    let computedHref = href ? href : '/'
    if (tag) {
      computedHref += `?tag=${tag.title}`
    } else if (tagParam && !isBase) {
      computedHref += `?${tagParam}`
    }
    if (isNav) {
      computedHref += '&nav=true'
    }
    return computedHref
  }

  return (
    <Link
      href={computeHref(tag)}
      onClick={onClick}
      className={className}
      key={tag ? tag.title : Math.random()}
    >
      {children}
    </Link>
  )
}
