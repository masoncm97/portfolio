import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Exit } from '../Exit'
import { Tag } from '@/types'
import { usePathname, useSearchParams } from 'next/navigation'
import { resolveHref } from '@/sanity/lib/utils'
import { isSearchParam } from '@/util/type-guards'
import { useState } from 'react'
import classNames from 'classnames'
import TextElement from '../TextElement'
import InternalLink from '../InternalLink'

export interface NavBarMenuProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  tags: Tag[]
}

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

  const setChooseTag = (tag: string | undefined) => {
    if (!tag) {
      tag = ''
    }
    setSelected(tag)
    setIsOpen(false)
  }

  if (tag) {
    const href = resolveHref(tag._type, tag.title)
    if (!href || !isSearchParam(href)) {
      return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100vw' }}
          animate={{ x: 0 }}
          exit={{ translateX: '100vw' }}
          transition={{ type: 'tween', duration: 0.5 }}
          className="min-h-screen right-0 fixed z-[1000001]"
        >
          <div className="top-0 w-[70vw] h-[100vh] bottom-0 right-0 bg-[#ffff55] text-right before:absolute before:min-h-full before:min-w-[2rem] before:left-0 before:z-50">
            <button className="mt-2 mr-2" onClick={() => setIsOpen(!isOpen)}>
              <Exit />
            </button>
            <div className="border border-black m-4 p-2">
              <h2 className="text-left mb-3">View</h2>
              <ul className="grid place-items-end">
                <InternalLink
                  href={'/'}
                  className={classNames(
                    !tag
                      ? 'border border-black rounded-full'
                      : 'border-[#ffff55]',
                    'px-2 py-1 border',
                  )}
                  onClick={() => setChooseTag('')}
                  isNav={false}
                  isBase={true}
                >
                  all
                </InternalLink>
                {tags &&
                  tags.map((tag) => (
                    <InternalLink
                      href={'/'}
                      className={classNames(
                        'px-2 py-1 border ',
                        tag.title === selected
                          ? 'border-black rounded-full'
                          : 'border-[#ffff55]',
                      )}
                      onClick={() => setChooseTag(tag.title)}
                      isNav={false}
                      key={tag.title}
                      tag={tag}
                    >
                      {tag.title}
                    </InternalLink>
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
              className="fixed bottom-5 left-[50%] transform -translate-x-1/2"
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
