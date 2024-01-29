import { InteractionMode } from '@/app/providers/InteractionModeProvider'
import classNames from 'classnames'

interface InteractionModeButtonProps {
  interactionMode: InteractionMode
  handleDotClick: () => void
  handleArrangeClick: () => void
}

export const InteractionModeButton = ({
  interactionMode,
  handleDotClick,
  handleArrangeClick,
}: InteractionModeButtonProps) => {
  const baseButtonStyle = `right-5 absolute z-[10000000]`

  return interactionMode == InteractionMode.Arrange ? (
    <button
      onClick={handleDotClick}
      className={classNames(
        baseButtonStyle,
        'bg-lemon aspect-square rounded-full w-14 top-2',
      )}
    >
      Dot
    </button>
  ) : (
    <button
      onClick={handleArrangeClick}
      className={classNames(
        baseButtonStyle,
        'border border-black rounded-md px-2 py-1 bg-white top-5',
      )}
    >
      Arrange
    </button>
  )
}
