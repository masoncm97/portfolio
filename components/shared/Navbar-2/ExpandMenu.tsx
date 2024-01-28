import classNames from 'classnames'
import { useState } from 'react'

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
    <div className="grid grid-cols-2">
      <div
        className={classNames(
          isOpen ? 'block' : 'hidden',
          'justify-self-start gap-x-3 gap',
        )}
      >
        {children}
      </div>
      <button
        className="flex gap-1 justify-self-end border border-green-500 col-start-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p>{title}</p>
        {isOpen ? <div>[x]</div> : <div>[+]</div>}
      </button>
    </div>
  )
}
