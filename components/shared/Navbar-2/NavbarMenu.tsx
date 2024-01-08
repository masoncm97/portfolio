import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Exit } from '../Exit'
import { Tag } from '@/types'
import { useSearchParams } from 'next/navigation'
import { getSearchParamLink } from '../SearchParamLink/server/getSearchParamLink'

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
  const searchTag = searchParams.get('tag')
  const tag = tags.find((tag) => tag.title === searchTag)

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
              <h2 className="text-left">Filter By:</h2>
              <ul>
                {tags &&
                  tags.map((tag) => {
                    return getSearchParamLink(tag)
                  })}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
