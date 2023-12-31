import { ArrowNav } from '@/components/shared/Arrow/ArrowNav'
import { Exit } from '@/components/shared/Exit'
import { EntryPayload } from '@/types'
import { getTableElementStyle } from '@/util/styles-helper'
import { isMedium, isSearchParam, isTags } from '@/util/type-guards'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import classNames from 'classnames'
import Link from 'next/link'
import { EntryImageBox } from '@/components/shared/Image/ImageBox'
import { getSearchParamLink } from '@/components/shared/Links/server/getSearchParamLink'
import { NavigationLink } from '@/components/shared/Links/client/NavigationLink'

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
    size,
    image,
    shortDescription,
    orientation,
    tags,
  } = data ?? {}

  const table = [title, location, medium, size, date, tags].filter(
    (item) => item !== null && item !== undefined && item !== '',
  )

  return (
    <section className="max-h-screen overflow-hidden grid gap-6">
      <div className="absolute z-10 mt-5 grid grid-cols-[min-content_1fr] gap-7 max-h-[10rem] w-full">
        <NavigationLink className="self-start ml-3" href="/">
          <Exit />
        </NavigationLink>
        <div className="z-10 flex flex-col w-full max-w-[50vw] place-self-end">
          {table.map((item, index) => {
            const tableElementBaseStyle = classNames(
              'px-2 text-right text-xs',
              getTableElementStyle(index, table.length, true),
            )
            if (isMedium(item)) {
              item = item.title
            }
            if (isTags(item)) {
              return (
                <div
                  className={classNames(
                    tableElementBaseStyle,
                    'flex flex-wrap px-0 justify-end gap-1',
                  )}
                >
                  {item.map((tag) => {
                    return getSearchParamLink(tag)
                  })}
                </div>
              )
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
        className="p-2"
      />
      <ArrowNav
        className={
          'center-horizontal fixed bottom-2 w-[20rem] max-h-7 max-w-lg'
        }
      />
    </section>
  )
}

export default Page
