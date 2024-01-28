'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MouseEventHandler, RefObject } from 'react'
import classNames from 'classnames'
import { Tag, TextSize } from '@/types'
import TextElement, { getTextStyle } from './TextElement'

export interface InternalLinkProps {
  tag?: Tag
  className?: string
  href?: string
  reference?: RefObject<HTMLAnchorElement>
  isNav: boolean
  isBase?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
  children: React.ReactNode
  index?: number
}

export default function InternalLink({
  tag,
  className,
  href,
  reference,
  isNav,
  isBase = false,
  onClick,
  children,
  index,
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
      key={tag ? tag.title : index}
      href={computeHref(tag)}
      onClick={onClick}
      ref={reference}
      className={classNames(getTextStyle(TextSize.md), className)}
      draggable={false}
    >
      {children}
    </Link>
  )
}
