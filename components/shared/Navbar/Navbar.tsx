'use client'

import { useEffect, useRef, useState } from 'react'
import NavbarMenu from './NavbarMenu'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Tag } from '@/types'
import { useSearchParams } from 'next/navigation'
import { track } from '@vercel/analytics'

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
      <div ref={ref}>
        <AnimatePresence>
          {isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'tween', duration: 0.5, delay: 0.2 }}
            >
              <button
                onClick={() => triggerNav()}
                className="bg-[#ee4539] aspect-square rounded-full fixed z-10 w-6 right-5 top-3"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <NavbarMenu isOpen={isOpen} setIsOpen={setIsOpen} tags={tags} />
    </>
  )
}
