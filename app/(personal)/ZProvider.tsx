'use client'

import { MutableRefObject, createContext, useRef } from 'react'

export interface ZState {
  zIndices: number[]
  topZ: MutableRefObject<number>
}

interface ZProviderProps {
  children: React.ReactNode
  length: number
}

export const ZContext = createContext<ZState>({
  zIndices: [],
  topZ: { current: 0 },
})

export default function ZProvider({ children, length }: ZProviderProps) {
  const zIndices = getRandomPermutation(length)
  const topZ = useRef<number>(length + 1)
  const zState = {
    zIndices,
    topZ,
  }

  return <ZContext.Provider value={zState}>{children}</ZContext.Provider>
}

function getRandomPermutation(n: number): number[] {
  let array = Array.from({ length: n + 1 }, (_, i) => i)
  for (let i = n; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}
