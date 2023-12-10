import { GalleryImageBox } from '@/components/shared/Image/ImageBox'
import SanityImage from '@/components/shared/Image/SanityImage'
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
      {/* <div className=" h-[3.5rem] xl:w-1/4">
        <TextBox entry={entry} />
      </div> */}
    </div>
  )
}

function TextBox({ entry }: { entry: EntryPayload }) {
  return (
    <div className="relative mt-1 flex w-full flex-col justify-between p-2 xl:mt-0">
      <div>
        {/* Title */}
        <div className="mb-1 text-xs sm:text-sm tracking-tight text-center">
          {entry.title}
        </div>
        {/* Date */}
        <div className="text-xs sm:text-sm tracking-tight text-center">
          {entry.date}
        </div>
      </div>
    </div>
  )
}
