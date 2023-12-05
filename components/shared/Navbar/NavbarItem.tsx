'use client'

import Link from 'next/link'
import type { Category, SearchParam as SearchParam } from '@/types'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface NavbarItemProps {
  category: Category
  searchParam: SearchParam
}

export default function NavbarItem({ category, searchParam }: NavbarItemProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()!
  const { name, value } = searchParam

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <Link href={pathname + '?' + createQueryString(name, value)}>
      {category.title}
    </Link>
  )
}
