'use client'

import { track } from '@vercel/analytics'
import { useInView } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { useContext, useRef, useState } from 'react'

import { CollectionsContext } from '@/app/providers/CollectionsProvider'
import { LogoWhite, LogoBlack } from '@/components/svg'
import { SettingsPayload, Tag, ViewMode, ViewModeCollection } from '@/types'

import { Collections } from './Collections'
import { EntryHeader } from './EntryHeader'
import { ExpandMenu } from './ExpandMenu'
import { Hamburger } from './Hamburger'
import { ViewModes } from './ViewModes'
import { ThemeContext } from '@/app/providers/ThemeProvider'
import classNames from 'classnames'

function LineBreak({ theme }: { theme: string }) {
  return (
    <div
      className={classNames(
        theme === 'Dark' ? 'bg-white' : 'bg-black',
        'h-[1px] w-screen ',
      )}
    />
  )
}
export default function Navbar({ data }: { data: SettingsPayload }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  // console.log(viewModeCollections)
  const searchParams = useSearchParams()
  const tags = data?.tags || ([] as Tag[])
  const viewModeCollections =
    data?.viewModeCollections || ([] as ViewModeCollection<ViewMode>[])

  const { highlightCollection } = useContext(CollectionsContext)

  let highlightTag = tags.find((tag) => tag.title === highlightCollection)

  const triggerNav = () => {
    track('Trigger Nav', { isOpen: isOpen })
    setIsOpen(!isOpen)
  }

  const { currentTheme } = useContext(ThemeContext)

  return (
    <section className="mb-3 relative">
      <Hamburger onClick={triggerNav} isOpen={isOpen} />
      <div className="ml-2 mr-5 my-2 w-[70%]">
        {currentTheme.title === 'Dark' ? <LogoWhite /> : <LogoBlack />}
      </div>
      <LineBreak theme={currentTheme.title} />
      <ExpandMenu title={'View'}>
        <ViewModes viewModeCollections={viewModeCollections} />
      </ExpandMenu>
      <LineBreak theme={currentTheme.title} />
      <ExpandMenu title={'Collections'}>
        <Collections tags={tags} />
      </ExpandMenu>
      <LineBreak theme={currentTheme.title} />
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
