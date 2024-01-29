'use client'

import { track } from '@vercel/analytics'
import classNames from 'classnames'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { useContext, useEffect, useRef, useState } from 'react'

import { LogoBlack } from '@/components/svg'
import { resolveHref } from '@/sanity/lib/utils'
import tag from '@/sanity/schemas/documents/tag'
import { SettingsPayload, Tag, ViewModeCollection } from '@/types'
import { isSearchParam } from '@/util/type-guards'

import InternalLink from '../InternalLink'
import TextElement from '../TextElement'
import { Collections } from './Collections'
import { EntryHeader } from './EntryHeader'
import { ExpandMenu } from './ExpandMenu'
import { Hamburger } from './Hamburger'
import { CollectionsContext } from '@/app/providers/CollectionsProvider'

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
  const viewModeCollections =
    data?.viewModeCollections || ([] as ViewModeCollection[])

  const { highlightCollection } = useContext(CollectionsContext)

  let highlightTag = tags.find((tag) => tag.title === highlightCollection)

  const triggerNav = () => {
    track('Trigger Nav', { isOpen: isOpen })
    setIsOpen(!isOpen)
  }

  const pathName = usePathname()
  // const searchTag = searchParams.get('tag')

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
      {highlightTag && (
        <EntryHeader
          title={highlightTag.title}
          body={highlightTag.description}
        />
      )}
      <div className="bg-fuschia w-screen overflow-x">
        in collage mode you can re-arrange the works
      </div>
    </section>
  )
}
