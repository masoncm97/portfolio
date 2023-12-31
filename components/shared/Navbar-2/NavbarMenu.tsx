import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Exit } from '../Exit'
import { Tag } from '@/types'
import { usePathname, useSearchParams } from 'next/navigation'
import { getSearchParamLink } from '../Links/server/getSearchParamLink'
import { resolveHref } from '@/sanity/lib/utils'
import { isSearchParam } from '@/util/type-guards'
import { useState } from 'react'
import classNames from 'classnames'
import TextElement from '../TextElement'

export interface NavBarMenuProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  tags: Tag[]
}

const navBarData = [
  {
    id: 0,
    title: 'Home',
    link: '/',
  },
  {
    id: 1,
    title: 'Services',
    link: '/services',
  },
  {
    id: 2,
    title: 'About Me',
    link: '/about',
  },
  {
    id: 3,
    title: 'My Approach',
    link: '/approach',
  },
]

export default function NavBarMenu({
  isOpen,
  setIsOpen,
  tags,
}: NavBarMenuProps) {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const searchTag = searchParams.get('tag')
  const tag = tags.find((tag) => tag.title === searchTag)
  const [selected, setSelected] = useState(tag?.title || '')
  if (tag) {
    const href = resolveHref(tag._type, tag.title)
    const isTag = tag._type === 'tag'
    if (!href || !isSearchParam(href)) {
      return null
    }
  }

  console.log(tags)
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          exit={{ translateX: '100vw' }}
          transition={{ type: 'tween', duration: 0.5 }}
          className="min-h-screen right-0 fixed z-20"
        >
          <div className="top-0 w-[70vw] h-[100vh] bottom-0 right-0 bg-[#ffff55] text-right before:absolute before:min-h-full before:min-w-[2rem] before:left-0 before:z-50">
            <button className="mt-2 mr-2" onClick={() => setIsOpen(!isOpen)}>
              <Exit />
            </button>
            <div className="border border-black m-4 p-2">
              <h2 className="text-left mb-3">Filter By Tag:</h2>
              <ul className="grid place-items-end">
                <Link
                  href={'/'}
                  onClick={() => setSelected('')}
                  className={classNames(
                    !tag
                      ? 'border border-black rounded-full'
                      : 'border-[#ffff55]',
                    'px-2 py-1 border',
                  )}
                >
                  all
                </Link>
                {tags &&
                  tags.map((tag) => (
                    <Link
                      href={
                        pathName
                          ? `${pathName}?tag=${tag.title}`
                          : `/?tag=${tag.title}`
                      }
                      onClick={() => (tag.title ? setSelected(tag.title) : '')}
                      className={classNames(
                        'px-2 py-1 border ',
                        tag.title === selected
                          ? 'border-black rounded-full'
                          : 'border-[#ffff55]',
                      )}
                      key={tag.title}
                    >
                      {tag.title}
                    </Link>
                  ))}
              </ul>
            </div>
            {tag && (
              <TextElement className="px-3" as={'p'} size={'sm'}>
                {tag.description}
              </TextElement>
            )}
            <div className="fixed bottom-28 left-3 grid place-items-end gap-1">
              <TextElement className="mb-1 text-right" as={'p'} size={'xs'}>
                Touch the art to view more information
              </TextElement>
              <TextElement as={'h1'} size={'lg'}>
                Mason Mathai
              </TextElement>
              <>Contact</>
            </div>
            <TextElement
              className="fixed bottom-1 right-1"
              as={'p'}
              size={'xs'}
            >
              © Mason Mathai 2024
            </TextElement>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
