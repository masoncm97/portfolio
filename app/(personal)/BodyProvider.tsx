'use client'

import { EntryPayload } from '@/types'
import { usePathname, useSearchParams } from 'next/navigation'
import { RefObject, createContext, useEffect } from 'react'

export const BodyContext = createContext<HTMLBodyElement | null>(null)

interface BodyProviderProps {
  children: React.ReactNode
  body: RefObject<HTMLBodyElement>
}

export default function BodyProvider({ children, body }: BodyProviderProps) {
  return (
    <BodyContext.Provider value={body.current}>{children}</BodyContext.Provider>
  )
}
