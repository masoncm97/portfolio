import { ArrowNav } from '@/components/shared/Arrow/ArrowNav'
import { Exit } from '@/components/shared/Exit'
import { EntryPayload } from '@/types'
import { getTableElementStyle } from '@/util/styles-helper'
import { isMedium } from '@/util/type-guards'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import classNames from 'classnames'
import Link from 'next/link'
import EntryImageBox from '@/components/shared/Image/EntryImageBox'

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
  } = data ?? {}

  const table = [title, location, date, medium].filter(
    (item) => item !== null && item !== undefined && item !== '',
  )

  return (
    <section className="h-screen overflow-hidden grid gap-6">
      <div className="mt-5 relative grid grid-cols-[min-content_1fr] gap-7 max-h-[10rem]">
        <Link className="self-start ml-3" href="/">
          <Exit />
        </Link>
        <div className="z-10 flex flex-col w-[20rem]">
          {table.map((item, index) => {
            if (isMedium(item)) {
              item = item.title
            }
            return (
              <p
                key={item}
                className={classNames(
                  getTableElementStyle(index, table.length, true),
                  'pl-2 bg-white',
                )}
              >
                {`${item}`}
              </p>
            )
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
      />
      <ArrowNav
        className={
          'center-horizontal fixed bottom-2 w-[20rem] max-h-7 max-w-lg'
        }
        next={data?.next}
        prev={data?.prev}
      />
    </section>
  )
}

export default Page
