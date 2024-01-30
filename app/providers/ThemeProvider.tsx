'use client'

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Theme, ThemeCollection } from '@/types'
import classNames from 'classnames'

export interface ThemeState {
  themeCollection: ThemeCollection
  currentTheme: Theme
  auto: boolean
  dispatch: Dispatch<any>
  setAuto: Dispatch<SetStateAction<boolean>>
}

interface ThemeProviderProps {
  themeCollection: ThemeCollection
  children: React.ReactNode
}

export const ThemeContext = createContext<ThemeState>({
  themeCollection: { title: '', viewModes: [] },
  currentTheme: { _type: '', title: '' },
  auto: true,
  dispatch: () => {},
  setAuto: () => {},
})

const getIsDark = () => {
  const hours = new Date().getHours()
  return hours < 7 || hours > 19
}

function themeReducer(_, action) {
  switch (action.type) {
    case 'SET_DARK': {
      return { _type: 'Theme', title: 'Dark' }
    }
    case 'SET_LIGHT': {
      return { _type: 'Theme', title: 'Light' }
    }
    case 'SET_AUTO': {
      return getIsDark()
        ? { _type: 'Theme', title: 'Dark' }
        : { _type: 'Theme', title: 'Light' }
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

export default function ThemeProvider({
  themeCollection,
  children,
}: ThemeProviderProps) {
  const isDark = getIsDark()
  const [auto, setAuto] = useState(true)

  const autoTheme: Theme = isDark
    ? { _type: 'Theme', title: 'Dark' }
    : { _type: 'Theme', title: 'Light' }

  const [currentTheme, dispatch] = useReducer(themeReducer, autoTheme)

  const themeState = {
    themeCollection,
    currentTheme,
    auto,
    dispatch,
    setAuto,
  }

  return (
    <ThemeContext.Provider value={themeState}>
      <div
        className={classNames(
          currentTheme.title == 'Dark' ? 'bg-black' : 'bg-white',
          'h-[100%] w-screen',
        )}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
