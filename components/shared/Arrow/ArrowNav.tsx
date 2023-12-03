import { Arrow } from './Arrow'
import Link from 'next/link'
import { EntryPayload } from '@/types'
import classNames from 'classnames'

export interface ArrowNavProps {
  className?: string
  entries?: EntryPayload[]
}

export function ArrowNav({ className, entries }: ArrowNavProps) {
  return (
    <div
      className={classNames(
        className,
        'grid grid-rows-1 gap-6 py-4 relative px-10 [&>*]:row-start-1',
      )}
    >
      <Link href={'/'}>
        <Arrow className="translate-y-[1px] rotate-180 place-self-end" />
      </Link>
      <Link href={'/'}>
        <Arrow className="" />
      </Link>
    </div>
  )
}
