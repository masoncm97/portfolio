import { MutableRefObject,useCallback, useContext, useState } from 'react'

import {
  InteractionMode,
  InteractionModeContext,
} from '@/app/(personal)/InteractionModeProvider'
import DotsCanvas from '@/components/shared/DotsCanvas'

interface Canvases {
  canvases: JSX.Element[]
  interactionMode: InteractionMode
  handleDrawClick: () => void
  handleArrangeClick: () => void
}

export const useCanvases = (
  topZ: MutableRefObject<number>,
  tag: string | undefined,
): Canvases => {
  const [canvases, setCanvases] = useState<JSX.Element[]>([])
  const { interactionMode, setInteractionMode } = useContext(
    InteractionModeContext,
  )

  const handleDrawClick = useCallback(() => {
    setCanvases((prevCanvases) => {
      const newCanvas = (
        <DotsCanvas key={prevCanvases.length} z={topZ.current} tag={tag} />
      )
      return [...prevCanvases, newCanvas]
    })

    setInteractionMode(InteractionMode.Dot)
  }, [setInteractionMode, tag])

  const handleArrangeClick = useCallback(() => {
    setInteractionMode(InteractionMode.Arrange)
  }, [setInteractionMode])

  return { canvases, interactionMode, handleDrawClick, handleArrangeClick }
}
