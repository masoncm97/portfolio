'use client'

import { useRef, useState } from 'react'
import NavbarMenu from './NavbarMenu'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Tag } from '@/types'

export default function Navbar({ tags }: { tags: Tag[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <>
      <div ref={ref}>
        <AnimatePresence>
          {isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'tween', duration: 0.5 }}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#ee4539] aspect-square rounded-full absolute z-10 w-6 right-5 top-3"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <NavbarMenu isOpen={isOpen} setIsOpen={setIsOpen} tags={tags} />
    </>
  )
}
