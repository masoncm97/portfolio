import Link from 'next/link'
import type { SearchParam as SearchParam } from '@/types'

interface SearchParamProps {
  searchParam: SearchParam
  queryString?: never
  className?: string
  pathName?: string
  children: React.ReactNode
}

interface QueryStringProps {
  searchParam?: never
  queryString: string
  className?: string
  pathName?: string
  children: React.ReactNode
}

type SearchParamLinkProps = SearchParamProps | QueryStringProps

export function SearchParamLink({
  searchParam,
  queryString,
  className,
  pathName,
  children,
}: SearchParamLinkProps) {
  const urlParams = computeUrlParams(searchParam, queryString)
  return (
    <Link
      className={className}
      href={pathName ? `${pathName}?${urlParams}` : `/?${urlParams}`}
    >
      {children}
    </Link>
  )
}

function computeUrlParams(
  searchParam: SearchParam | undefined,
  queryString: string | undefined,
): string {
  let urlParams = ''
  if (searchParam) {
    const { name, value } = searchParam
    const params = new URLSearchParams()
    params.set(name, value)
    urlParams = params.toString()
  } else if (queryString) {
    urlParams = queryString
  }

  return urlParams
}
