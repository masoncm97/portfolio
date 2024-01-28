import classNames from 'classnames'

interface HamburgerProps {
  onClick: () => void
  isOpen: boolean
}

export const Hamburger = ({ onClick, isOpen }: HamburgerProps) => {
  const genericHamburgerLine = `h-1.5 w-12 lg:w-14 my-[.17rem] bg-black justify-self-center self-center transition ease transform duration-300`

  return (
    <button
      aria-label="Open Sidebar"
      className="flex flex-col justify-center items-center mx-5 absolute right-0 top-6"
      onClick={onClick}
    >
      <div
        className={classNames(
          genericHamburgerLine,
          isOpen
            ? 'rotate-45 translate-y-3 group-hover:opacity-100'
            : 'group-hover:opacity-100',
        )}
      />
      <div
        className={classNames(
          genericHamburgerLine,
          isOpen
            ? '-rotate-45 group-hover:opacity-100'
            : 'group-hover:opacity-100',
        )}
      />
    </button>
  )
}
