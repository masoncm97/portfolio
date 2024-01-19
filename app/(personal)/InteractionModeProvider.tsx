'use client'

import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useState,
} from 'react'

export enum InteractionMode {
  Draw,
  Layer,
}

export interface InteractionModeState {
  interactionMode: InteractionMode
  setInteractionMode: Dispatch<SetStateAction<InteractionMode>>
}

interface InteractionModeProviderProps {
  children: React.ReactNode
}

export const InteractionModeContext = createContext<InteractionModeState>({
  interactionMode: InteractionMode.Layer,
  setInteractionMode: () => {},
})

export default function InteractionModeProvider({
  children,
}: InteractionModeProviderProps) {
  const [interactionMode, setInteractionMode] = useState(InteractionMode.Layer)
  const interactionModeState = {
    interactionMode,
    setInteractionMode,
  }

  return (
    <InteractionModeContext.Provider value={interactionModeState}>
      {children}
    </InteractionModeContext.Provider>
  )
}
