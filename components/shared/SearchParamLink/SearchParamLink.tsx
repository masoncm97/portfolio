'use client'

import Link from 'next/link'
import type { SearchParam as SearchParam } from '@/types'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface SearchParamLinkProps {
  link?: string
  searchParam: SearchParam
  className?: string
}

export default function SearchParamLink({
  link,
  searchParam,
  className,
}: SearchParamLinkProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const { name, value } = searchParam
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams()
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <Link
      className={className}
      href={pathname + '?' + createQueryString(name, value)}
    >
      {link}
    </Link>
  )
}
