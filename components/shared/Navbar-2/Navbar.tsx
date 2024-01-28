'use client'

import { track } from '@vercel/analytics'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Tag } from '@/types'

import NavbarMenu from './NavbarMenu'
import { LogoBlack } from '@/components/logos'
import classNames from 'classnames'

export default function Navbar({ tags }: { tags: Tag[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const searchParams = useSearchParams()

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

  const genericHamburgerLine = `h-1.5 w-12 lg:w-14 my-[.17rem] bg-black justify-self-center self-center transition ease transform duration-300 bg-gold-ochre`

  return (
    <section className="mb-3 relative">
      {/* <button
        onClick={() => triggerNav()}
        className="bg-[#ee4539] aspect-square rounded-full fixed w-6 right-5 top-3 z-[1000000]"
      /> */}
      <button
        aria-label="Open Sidebar"
        className="flex flex-col justify-center items-center mx-5 absolute right-0 top-6"
        onClick={() => triggerNav()}
      >
        <div
          className={classNames(
            genericHamburgerLine,
            isOpen
              ? 'rotate-45 translate-y-3 group-hover:opacity-100'
              : 'group-hover:opacity-100',
          )}
        />
        <div
          className={classNames(
            genericHamburgerLine,
            isOpen
              ? '-rotate-45 group-hover:opacity-100'
              : 'group-hover:opacity-100',
          )}
        />
      </button>
      <div className="ml-2 mr-5 my-2">
        <LogoBlack />
      </div>
      <div className="h-[1px] w-screen bg-black" />
      <div className="flex gap-2 justify-end my-1">
        <p>View</p>
        <div>[+]</div>
      </div>
      <div className="h-[1px] w-screen bg-black" />
      <div className="flex gap-2 justify-end my-1">
        <p>Collections</p>
        <div>[+]</div>
      </div>
      <div className="h-[1px] w-screen bg-black" />
      <div className="bg-fuschia w-screen overflow-x">
        in collage mode you can re-arrange the works
      </div>
      {/* <NavbarMenu isOpen={isOpen} setIsOpen={setIsOpen} tags={tags} /> */}
    </section>
  )
}
