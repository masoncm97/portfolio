import { Arrow } from './Arrow'
import Link from 'next/link'
import classNames from 'classnames'

export interface ArrowNavProps {
  className?: string
  next?: string
  prev?: string
}

export function ArrowNav({ className, next, prev }: ArrowNavProps) {
  return (
    <div
      className={classNames(
        className,
        'grid grid-rows-1 gap-6 py-4 px-10 [&>*]:row-start-1 bg-white',
      )}
    >
      <Link className="grid" href={`/${next}`}>
        <Arrow className="translate-y-[1px] rotate-180 place-self-end" />
      </Link>
      <Link className="grid" href={`/${prev}`}>
        <Arrow />
      </Link>
    </div>
  )
}
