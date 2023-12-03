import { ArrowNav } from '@/components/shared/Arrow/ArrowNav'
import ImageBox from '@/components/shared/ImageBox'
import { Exit } from '@/components/shared/exit'
import { EntryPayload } from '@/types'
import { getTableElementStyle } from '@/util/styles-helper'
import { isMedium } from '@/util/type-guards'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import classNames from 'classnames'
import Link from 'next/link'

export interface PageProps {
  data: EntryPayload | undefined
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Page({ data, encodeDataAttribute }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, location, date, medium, image, shortDescription } = data ?? {}

  const table = [title, location, date, medium, shortDescription].filter(
    (item) => item !== null && item !== undefined && item !== '',
  )

  return (
    <section className="grid gap-6">
      <Link className="place-self-start ml-3" href="/">
        <Exit />
      </Link>
      {/* Image  */}
      <ImageBox
        data-sanity={encodeDataAttribute?.('image')}
        image={image}
        // @TODO add alt field in schema
        alt=""
        classesWrapper="relative aspect-[16/9]"
      />
      <div className="flex flex-col w-[20rem] place-self-center">
        {table.map((item, index) => {
          if (isMedium(item)) {
            item = item.title
          }
          return (
            <p
              key={item}
              className={classNames(
                getTableElementStyle(index, table.length + 1, true),
                'pl-2',
              )}
            >
              {`${item}`}
            </p>
          )
        })}
        <ArrowNav
          className={classNames(
            getTableElementStyle(table.length - 1, table.length, true),
          )}
          next={data?.next}
          prev={data?.prev}
        />
      </div>
    </section>
  )
}

export default Page
