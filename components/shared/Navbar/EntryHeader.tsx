import classNames from 'classnames'
import { useState } from 'react'
import { SuperScriptElement } from './SuperScriptElement'
import TextElement from '../TextElement'
import { TextSize } from '@/types'
import { getCamelCase } from '@/util/styles-helper'

interface EntryHeaderProps {
  title?: string
  body?: string
}
export const EntryHeader = ({ title, body }: EntryHeaderProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const heading = getCamelCase(title)

  return (
    <div
      className={classNames(
        isOpen ? 'block' : 'hidden',
        'grid grid-cols-1 p-2 gap-y-2',
      )}
    >
      {heading && (
        <button className="flex" onClick={() => setIsOpen((prev) => !prev)}>
          <SuperScriptElement
            title={heading}
            size={TextSize.xl}
            superScript={'[x]'}
          />
        </button>
      )}
      <TextElement
        size={TextSize.sm}
        className={classNames(
          isOpen ? 'block' : 'hidden',
          'gap-x-3 gap text-end max-w-[90%] justify-self-end',
        )}
      >
        {body}
      </TextElement>
    </div>
  )
}
