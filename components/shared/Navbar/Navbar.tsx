'use client'

import { track } from '@vercel/analytics'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SettingsPayload, Tag, ViewModeCollection } from '@/types'
import { LogoBlack } from '@/components/svg'
import classNames from 'classnames'
import { Hamburger } from './Hamburger'
import { ExpandMenu } from './ExpandMenu'
import tag from '@/sanity/schemas/documents/tag'
import InternalLink from '../InternalLink'
import { resolveHref } from '@/sanity/lib/utils'
import { isSearchParam } from '@/util/type-guards'
import { Collections } from './Collections'
import TextElement from '../TextElement'
import { EntryHeader } from './EntryHeader'

function LineBreak() {
  return <div className="h-[1px] w-screen bg-black" />
}
export default function Navbar({ data }: { data: SettingsPayload }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  // console.log(viewModeCollections)
  const searchParams = useSearchParams()
  const tags = data?.tags || ([] as Tag[])
  console.log('yup', data)
  const viewModeCollections =
    data?.viewModeCollections || ([] as ViewModeCollection[])
  console.log(viewModeCollections)
  const tagParam = searchParams
    .toString()
    .split('&')
    .find((param) => param.includes('nav'))

  useEffect(() => {
    if (tagParam) {
      setIsOpen(true)
    }
  }, [tagParam])

  const triggerNav = () => {
    track('Trigger Nav', { isOpen: isOpen })
    setIsOpen(!isOpen)
  }

  const pathName = usePathname()
  const searchTag = searchParams.get('tag')
  const tag = tags.find((tag) => tag.title === searchTag)

  return (
    <section className="mb-3 relative">
      <Hamburger onClick={triggerNav} isOpen={isOpen} />
      <div className="ml-2 mr-5 my-2 w-[70%]">
        <LogoBlack />
      </div>
      <LineBreak />
      <ExpandMenu title={'View'}>
        {viewModeCollections?.map((collection) => (
          <div key={collection.title} className="flex gap-x-3">
            {collection?.viewModes?.map((mode) => (
              <p key={mode.title}>{mode.title}</p>
            ))}
          </div>
        ))}
      </ExpandMenu>
      <LineBreak />
      <ExpandMenu title={'Collections'}>
        <Collections tags={tags} />
      </ExpandMenu>
      <LineBreak />
      <EntryHeader title={tag?.title} body={tag?.description} />
      <div className="bg-fuschia w-screen overflow-x">
        in collage mode you can re-arrange the works
      </div>
    </section>
  )
}
