import classNames from 'classnames'
import { useState } from 'react'

import { TextSize } from '@/types'

import TextElement from '../TextElement'

interface ExpandMenuProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}
export const ExpandMenu = ({
  title,
  defaultOpen,
  children,
}: ExpandMenuProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen ? defaultOpen : false)

  return (
    <div className="grid grid-cols-[1fr,min-content] p-2">
      <div
        className={classNames(
          isOpen ? 'block' : 'hidden',
          'justify-self-start gap-x-3 gap',
        )}
      >
        {children}
      </div>
      <button
        className="flex gap-1 justify-self-end col-start-2 mb-auto"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <TextElement size={TextSize.md}>{title}</TextElement>
        {isOpen ? (
          <TextElement>[x]</TextElement>
        ) : (
          <TextElement>[+]</TextElement>
        )}
      </button>
    </div>
  )
}
