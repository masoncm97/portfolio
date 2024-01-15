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
  pathName?: string
  isNav: boolean
  onClick?: () => void
  children: React.ReactNode
}

export default function InternalLink({
  tag,
  className,
  pathName,
  isNav,
  onClick,
  children,
}: InternalLinkProps) {
  const searchParams = useSearchParams()

  const tagParam = searchParams
    .toString()
    .split('&')
    .find((param) => param.includes('tag'))

  if (tag) {
    const href = resolveHref(tag._type, tag.title)
    if (!href || !isSearchParam(href)) {
      return null
    }
  }

  const computeHref = (tag: Tag | undefined): string => {
    let href = '/'
    if (pathName) {
      href += pathName
    }
    if (tag) {
      href += `?tag=${tag.title}`
    } else if (tagParam) {
      href += `?${tagParam}`
    }

    if (isNav) {
      href += '&nav=true'
    }
    return href
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
