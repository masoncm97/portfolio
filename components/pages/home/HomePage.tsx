import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import Link from 'next/link'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'
import { EntryListItem } from './EntryListItem'
import { generateSiblingRoutes } from '@/util/routes-helper'
// import { getSearchParamElem } from '@/components/shared/SearchParamLink/getSearchParamLink'
import { SearchParamLink } from '@/components/shared/SearchParamLink/server/SearchParamLink'

export interface HomePageProps {
  data: HomePagePayload | null
  searchParams: string | string[] | undefined
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({
  data,
  searchParams,
  encodeDataAttribute,
}: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], entries = [], title = '' } = data ?? {}

  let gallery = entries

  if (searchParams && searchParams['category']) {
    gallery = entries?.filter((entry) => {
      return entry.category?.title === searchParams['category']
    })
  }

  if (searchParams && searchParams['tag']) {
    gallery = entries?.filter((entry) => {
      console.log(entry.tags?.some((tag) => tag.title === searchParams['tag']))
      return entry.tags?.some((tag) => tag.title === searchParams['tag'])
    })
  }

  // console.log(searchParams!['tag'])
  console.log('searchParams from homepage', searchParams)
  const queryString = createQueryString(searchParams)
  console.log(queryString)

  return (
    <div className="space-y-20">
      {title && <Header centered title={title} description={overview} />}
      {gallery && gallery.length > 0 && (
        <div className="mx-auto grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
          {gallery.map((entry, key) => {
            // const href = resolveHref(entry._type, entry.slug)
            // if (!href || typeof href != 'string') {
            //   return null
            // }
            return (
              // <Link
              //   key={key}
              //   href={href}
              //   data-sanity={encodeDataAttribute?.(['entries', key, 'slug'])}
              // >
              //   <EntryListItem entry={entry} />
              // </Link>
              <SearchParamLink
                key={key}
                queryString={queryString}
                pathName={entry.slug}
              >
                <EntryListItem entry={entry} />
              </SearchParamLink>
            )
          })}
        </div>
      )}
    </div>
  )
}

const createQueryString = (searchParams: string | string[] | undefined) => {
  let queryString = ''
  if (!searchParams) return queryString
  if (typeof searchParams === 'string') return searchParams
  for (const [key, value] of Object.entries(searchParams)) {
    if (queryString !== '') {
      queryString += '&'
    }
    queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  }
  return queryString
}

export default HomePage
