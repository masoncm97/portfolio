import classNames from 'classnames'
import { useState } from 'react'
import { SuperScriptElement } from './SuperScriptElement'
import TextElement from '../TextElement'

interface ExpandBlurbProps {
  title?: string
  body?: string
}
export const ExpandBlurb = ({ title, body }: ExpandBlurbProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={classNames(isOpen ? 'block' : 'hidden', 'grid grid-cols-1')}
    >
      <button className="flex" onClick={() => setIsOpen((prev) => !prev)}>
        <SuperScriptElement superScript={'[x]'}>{title}</SuperScriptElement>
      </button>
      <TextElement
        size="sm"
        className={classNames(
          isOpen ? 'block' : 'hidden',
          'gap-x-3 gap text-end',
        )}
      >
        {body}
      </TextElement>
    </div>
  )
}
