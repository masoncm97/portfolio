'use client'
import type { Tag } from '@/types'
import classNames from 'classnames'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface TagContainerProps {
  tags: Tag[]
  className?: string
}

export default function TagContainer({ tags, className }: TagContainerProps) {
  const searchParams = useSearchParams()
  const searchTag = searchParams.get('tag')
  const tag = tags.find((tag) => tag.title === searchTag)

  return (
    <>
      {tag && (
        <div
          className={classNames(
            className,
            'bg-white absolute p-1 w-full h-full top-0 left-0 text-xs z-20',
          )}
        >
          <Link href={'/'}>
            ← <span className="underline text-blue-700">#{tag.title}</span>
          </Link>
          <p className="pt-1 pl-3">{tag.description && `${tag.description}`}</p>
        </div>
      )}
    </>
  )
}
