import classNames from 'classnames'

import { TextSize } from '@/types'

type TextElementProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  size?: TextSize
  children: React.ReactNode
  className?: string
}

export default function TextElement({
  as: Comp = 'p',
  className,
  children,
  size = TextSize.xs,
}: TextElementProps) {
  return (
    <Comp className={classNames(className, getTextStyle(size))}>
      {children}
    </Comp>
  )
}

export function getTextStyle(size: TextSize): string {
  if (size === TextSize.xl) return 'text-2xl md:text-3xl'
  if (size === TextSize.lg) return 'text-xl md:text-2xl'
  if (size === TextSize.md) return 'text-base md:text-xl'
  if (size === TextSize.sm) return 'text-sm md:text-base'
  if (size === TextSize.xs) return 'text-xs md:text-sm'
  if (size === TextSize.xxs) return 'text-xxs md:text-xs'
  throw Error('Must provide valid text size')
}
