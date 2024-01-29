'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Theme, ThemeCollection } from '@/types'

export interface ThemeState {
  themeCollection: ThemeCollection
  currentTheme: Theme
  setCurrentTheme: Dispatch<SetStateAction<Theme>>
}

interface ThemeProviderProps {
  themeCollection: ThemeCollection
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeState>({
  themeCollection: { title: '', viewModes: [] },
  currentTheme: { _type: 'Theme', title: 'Light' },
  setCurrentTheme: () => {},
})

export default function ThemeProvider({
  themeCollection,
  children,
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState({
    _type: 'Theme',
    title: 'Light',
  })

  const themeState = {
    themeCollection,
    currentTheme,
    setCurrentTheme,
  }

  useEffect(() => {
    console.log('llpp')
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  )
}
