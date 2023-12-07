import { ArrowNav } from '@/components/shared/Arrow/ArrowNav'
import { Exit } from '@/components/shared/Exit'
import { EntryPayload } from '@/types'
import { getTableElementStyle } from '@/util/styles-helper'
import { isMedium, isSearchParam, isTags } from '@/util/type-guards'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import classNames from 'classnames'
import Link from 'next/link'
import { EntryImageBox } from '@/components/shared/Image/ImageBox'
import { getSearchParamLink } from '@/components/shared/SearchParamLink/getSearchParamLink'

// Make a change
export interface PageProps {
  data: EntryPayload | undefined
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Page({ data, encodeDataAttribute }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    title,
    location,
    date,
    medium,
    image,
    shortDescription,
    orientation,
    tags,
  } = data ?? {}

  const table = [title, location, date, medium, tags].filter(
    (item) => item !== null && item !== undefined && item !== '',
  )

  return (
    <section className="max-h-screen border border-red-500 overflow-hidden grid gap-6">
      <div className="absolute border border-green-500 z-10 mt-5 grid grid-cols-[min-content_1fr] gap-7 max-h-[10rem] w-full">
        <Link className="self-start ml-3" href="/">
          <Exit />
        </Link>
        <div className="z-10 border border-blue-500 flex flex-col w-full max-w-[50vw] place-self-end">
          {table.map((item, index) => {
            const tableElementBaseStyle = classNames(
              'px-2 text-right text-xs',
              getTableElementStyle(index, table.length, true),
            )
            if (isMedium(item)) {
              item = item.title
            }
            if (isTags(item)) {
              return item.map((tag) => {
                return getSearchParamLink(tag, tableElementBaseStyle)
              })
            } else {
              return (
                <p key={item} className={tableElementBaseStyle}>
                  {`${item}`}
                </p>
              )
            }
          })}
        </div>
      </div>
      <EntryImageBox
        imageBox={{
          image: image,
          alt: shortDescription ? `${shortDescription}` : 'Primary image',
        }}
        orientation={orientation}
        data-sanity={encodeDataAttribute?.('image')}
        className="border border-purple-500"
      />
      {/* <ArrowNav
        className={
          'fixed bottom-2 w-[20rem] max-h-7 max-w-lg border border-red-500'
        }
        next={data?.next}
        prev={data?.prev}
      /> */}
    </section>
  )
}

export default Page
