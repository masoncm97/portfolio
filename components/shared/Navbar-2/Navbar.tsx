'use client'

import { track } from '@vercel/analytics'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { SettingsPayload, Tag, ViewModeCollection } from '@/types'

import NavbarMenu from './NavbarMenu'
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
import { ExpandBlurb } from './ExpandBlurb'

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
  const [selected, setSelected] = useState(tag?.title || '')
  return (
    <section className="mb-3 relative">
      {/* <button
        onClick={() => triggerNav()}
        className="bg-[#ee4539] aspect-square rounded-full fixed w-6 right-5 top-3 z-[1000000]"
      /> */}
      <Hamburger onClick={triggerNav} isOpen={isOpen} />
      <div className="ml-2 mr-5 my-2">
        <LogoBlack />
      </div>
      <div className="h-[1px] w-screen bg-black" />
      <ExpandMenu title={'View'}>
        {viewModeCollections?.map((collection) => (
          <div key={collection.title} className="flex gap-x-3">
            {collection?.viewModes?.map((mode) => (
              <p key={mode.title}>{mode.title}</p>
            ))}
          </div>
        ))}
      </ExpandMenu>
      <div className="h-[1px] w-screen bg-black" />
      <ExpandMenu title={'Collections'}>
        <Collections tags={tags} />
      </ExpandMenu>
      <div className="h-[1px] w-screen bg-black" />
      {/* <div>
        <TextElement as="h2" size="md">
          {tag?.title}
        </TextElement>
        <TextElement>{tag?.description}</TextElement>
      </div> */}
      <ExpandBlurb title={tag?.title} body={tag?.description} />
      <div className="bg-fuschia w-screen overflow-x">
        in collage mode you can re-arrange the works
      </div>
      {/* <NavbarMenu isOpen={isOpen} setIsOpen={setIsOpen} tags={tags} /> */}
    </section>
  )
}
