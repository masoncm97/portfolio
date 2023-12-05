import classNames from 'classnames'

export interface ExitProps {
  className?: string
}

export function Exit({ className }: ExitProps) {
  const arrowStyle = 'absolute h-[1px] bg-black w-6 top-[50%]'

  return (
    <div className={classNames(className, 'relative w-[3rem] h-[3rem]')}>
      <div className={classNames(arrowStyle, 'rotate-45')} />
      <div className={classNames(arrowStyle, '-rotate-45')} />
    </div>
  )
}
