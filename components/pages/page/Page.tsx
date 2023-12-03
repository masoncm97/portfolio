import ImageBox from '@/components/shared/ImageBox'
import { EntryPayload } from '@/types'
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc'
import classNames from 'classnames'

export interface PageProps {
  data: EntryPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function Page({ data, encodeDataAttribute }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, location, date, image, shortDescription } = data ?? {}
  const table = new Map<string, string | undefined>([
    ['title', title],
    ['location', location],
    ['date', date],
  ])

  return (
    <div>
      <div className="mb-14">
        <div>
          <div className="mb-14">
            <div className="mb-14">
              {/* Image  */}
              <ImageBox
                data-sanity={encodeDataAttribute?.('image')}
                image={image}
                // @TODO add alt field in schema
                alt=""
                classesWrapper="relative aspect-[16/9]"
              />
            </div>
            <div className="flex flex-col w-[20rem]">
              {Array.from(table).map(([key, value], index) => {
                if (!value) return null
                return (
                  <p
                    key={key}
                    className={classNames(
                      getTableElementStyle(index, table.size, true),
                      'pl-2',
                    )}
                  >
                    {`${key}: ${value}`}
                  </p>
                )
              })}
              {/* <ArrowNav entries={entriesData!} /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 w-screen border-t" />
    </div>
  )
}
export function getTableElementStyle(
  index: number,
  length: number,
  columnPriority: boolean = false,
) {
  return classNames(
    'border border-black',
    columnPriority
      ? index === length - 1
        ? 'border-b-[1px]'
        : 'border-b-0'
      : index === length - 1
        ? 'max-lg:border-b-[1px] lg:border-r-[1px]'
        : 'max-lg:border-b-0 lg:border-r-0',
  )
}

export default Page
