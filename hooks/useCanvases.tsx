import {
  InteractionModeContext,
  InteractionMode,
} from '@/app/(personal)/InteractionModeProvider'
import DotsCanvas from '@/components/shared/DotsCanvas'
import { useState, useContext, useCallback, MutableRefObject } from 'react'

interface Canvases {
  canvases: JSX.Element[]
  interactionMode: InteractionMode
  handleDrawClick: () => void
  handleArrangeClick: () => void
}

export const useCanvases = (topZ: MutableRefObject<number>): Canvases => {
  const [canvases, setCanvases] = useState<JSX.Element[]>([])
  const { interactionMode, setInteractionMode } = useContext(
    InteractionModeContext,
  )

  const handleDrawClick = useCallback(() => {
    // topZ.current += 1
    setCanvases((prevCanvases) => {
      const newCanvas = (
        <DotsCanvas key={prevCanvases.length} z={topZ.current} />
      )
      return [...prevCanvases, newCanvas]
    })
    // When you use a function inside your state setter, React guarantees that this function
    // will receive the most up-to-date state (functional update)
    // Because we're not using the 'canvases' variable directly in our update, we don't need to include it
    // in our dependency array
    setInteractionMode(InteractionMode.Dot)
  }, [setInteractionMode])

  const handleArrangeClick = useCallback(() => {
    setInteractionMode(InteractionMode.Arrange)
    console.log('set')
  }, [setInteractionMode])

  return { canvases, interactionMode, handleDrawClick, handleArrangeClick }
}
