import { GalleryImageBox } from '@/components/shared/Image/ImageBox'
import type { EntryPayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'

interface EntryProps {
  entry: EntryPayload
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function EntryListItem(props: EntryProps) {
  const { entry, encodeDataAttribute } = props
  return (
    <div
      id={entry.slug}
      className={'flex flex-col justify-between h-full p-1 gap-x-5 xl:flex-row'}
    >
      <div className="h-full grid w-full xl:w-9/12">
        <GalleryImageBox
          imageBox={{
            image: entry.image,
            alt: entry.shortDescription
              ? entry.shortDescription
              : `Cover image from ${entry.title}`,
          }}
          data-sanity={encodeDataAttribute?.('image')}
          className="place-self-center"
          orientation={entry.orientation}
        />
      </div>
    </div>
  )
}
