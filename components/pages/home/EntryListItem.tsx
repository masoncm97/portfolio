import ImageBox from '@/components/shared/ImageBox'
import type { EntryPayload } from '@/types'

interface EntryProps {
  entry: EntryPayload
  odd: number
}

export function EntryListItem(props: EntryProps) {
  const { entry, odd } = props
  return (
    <div className={`flex flex-col gap-x-5 p-2 transition xl:flex-row`}>
      <div className="w-full xl:w-9/12">
        <ImageBox
          image={entry.image}
          alt={`Cover image from ${entry.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
      <div className="flex xl:w-1/4">
        <TextBox entry={entry} />
      </div>
    </div>
  )
}

function TextBox({ entry }: { entry: EntryPayload }) {
  return (
    <div className="relative mt-2 flex w-full flex-col justify-between p-3 xl:mt-0">
      <div>
        {/* Title */}
        <div className="mb-2 text-xs sm:text-sm tracking-tight text-center">
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
