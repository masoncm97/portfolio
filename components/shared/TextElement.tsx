import classNames from 'classnames'

type TextElementProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  className?: string
}

export default function TextElement({
  as: Comp = 'p',
  className,
  children,
  size = 'xs',
}: TextElementProps) {
  return (
    <Comp
      className={classNames(
        className,
        size === 'xl' && 'text-5xl md:text-7xl',
        size === 'lg' && 'text-4xl md:text-5xl',
        size === 'md' && 'text-3xl md:text-4xl',
        size === 'sm' && 'text-sm md:text-base',
        size === 'xs' && 'text-xs md:text-sm',
      )}
    >
      {children}
    </Comp>
  )
}
