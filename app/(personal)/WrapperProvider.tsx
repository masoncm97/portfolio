'use client'

import { RefObject, createContext } from 'react'

export const WrapperContext = createContext<HTMLDivElement | null>(null)

interface WrapperProviderProps {
  children: React.ReactNode
  wrapper: RefObject<HTMLDivElement>
}

export default function WrapperProvider({
  children,
  wrapper,
}: WrapperProviderProps) {
  console.log(wrapper)
  return (
    <WrapperContext.Provider value={wrapper.current}>
      {children}
    </WrapperContext.Provider>
  )
}
