'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface NavigationLinkProps {
  children: React.ReactNode
  className?: string
  href?: string
}

export function NavigationLink({
  href: pathName,
  className,
  children,
}: NavigationLinkProps) {
  const searchParams = useSearchParams()

  return (
    <Link
      className={className}
      href={
        pathName
          ? `${pathName}?${searchParams.toString()}`
          : `/?${searchParams.toString()}`
      }
    >
      {children}
    </Link>
  )
}
