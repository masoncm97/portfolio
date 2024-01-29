'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Layout, LayoutCollection, Theme, ThemeCollection } from '@/types'

export interface LayoutState {
  layoutCollection: LayoutCollection
  currentLayout: Layout
  setCurrentLayout: Dispatch<SetStateAction<Layout>>
}

interface LayoutProviderProps {
  layoutCollection: LayoutCollection
  children: React.ReactNode
}

export const LayoutContext = createContext<LayoutState>({
  layoutCollection: { title: '', viewModes: [] },
  currentLayout: { _type: 'Layout', title: 'Collage' },
  setCurrentLayout: () => {},
})

export default function LayoutProvider({
  layoutCollection,
  children,
}: LayoutProviderProps) {
  const [currentLayout, setCurrentLayout] = useState({
    _type: 'Layout',
    title: 'Collage',
  })

  const layoutState = {
    layoutCollection,
    currentLayout,
    setCurrentLayout,
  }

  useEffect(() => {
    console.log('llpp')
  }, [currentLayout])

  return (
    <LayoutContext.Provider value={layoutState}>
      {children}
    </LayoutContext.Provider>
  )
}
