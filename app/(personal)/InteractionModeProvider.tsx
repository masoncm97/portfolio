'use client'

import { Dispatch, SetStateAction, createContext, useState } from 'react'

export enum InteractionMode {
  Dot,
  Arrange,
}

export interface InteractionModeState {
  interactionMode: InteractionMode
  setInteractionMode: Dispatch<SetStateAction<InteractionMode>>
}

interface InteractionModeProviderProps {
  children: React.ReactNode
}

export const InteractionModeContext = createContext<InteractionModeState>({
  interactionMode: InteractionMode.Arrange,
  setInteractionMode: () => {},
})

export default function InteractionModeProvider({
  children,
}: InteractionModeProviderProps) {
  const [interactionMode, setInteractionMode] = useState(
    InteractionMode.Arrange,
  )
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
