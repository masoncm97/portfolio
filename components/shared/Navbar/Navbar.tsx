'use client'

import { track } from '@vercel/analytics'
import { AnimatePresence,motion, useInView } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Tag } from '@/types'

import NavbarMenu from './NavbarMenu'

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

  return (
    <>
      <button
        onClick={() => triggerNav()}
        className="bg-[#ee4539] aspect-square rounded-full fixed w-6 right-5 top-3 z-[1000000]"
      />
      <NavbarMenu isOpen={isOpen} setIsOpen={setIsOpen} tags={tags} />
    </>
  )
}
