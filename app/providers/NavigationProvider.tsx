'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { createContext, useEffect } from 'react'

import { EntryPayload } from '@/types'

export const NavigationContext = createContext<NavigationState | null>(null)

interface NavigationProviderProps {
  children: React.ReactNode
  entries: EntryPayload[] | undefined
}

interface NavigationState {
  next: string
  prev: string
}

export default function NavigationProvider({
  children,
  entries,
}: NavigationProviderProps) {
  const searchParams = useSearchParams()
  const pathName = usePathname()

  let navigatableEntries: EntryPayload[] = entries || []

  if (Array.from(searchParams.keys()).length > 0) {
    navigatableEntries = []
    for (const key of searchParams.keys()) {
      const filteredEntries = entries?.filter(
        (entry) =>
          entry.tags?.some(
            (tag) =>
              tag.title === searchParams.get(key) ||
              entry.category?.title === searchParams.get(key),
          ),
      )
      if (filteredEntries) {
        navigatableEntries.push(...filteredEntries)
      }
    }
  }

  const siblingRoutes = generateSiblingRoutes(navigatableEntries)
  const current = trimLeadingSlash(pathName)

  useEffect(() => {
    sessionStorage.setItem('lastViewedImage', current)
  }, [current])

  const navigationState = {
    prev: getNextRoute(current, siblingRoutes, (index) => index + 1),
    next: getNextRoute(current, siblingRoutes, (index) => index - 1),
  }

  return (
    <NavigationContext.Provider value={navigationState}>
      {children}
    </NavigationContext.Provider>
  )
}

function generateSiblingRoutes(entries: EntryPayload[] | undefined): string[] {
  if (!entries) return []
  return entries.map((entry) => `${entry.slug}`)
}

function getNextRoute(
  currentRoute: string,
  siblingRoutes: string[],
  modifier: (number) => number,
) {
  if (!siblingRoutes || siblingRoutes.length === 0) return ''

  const currentIndex = siblingRoutes.indexOf(currentRoute)
  if (currentIndex === -1) return ''

  const newIndex = modifier(currentIndex) % siblingRoutes.length

  return siblingRoutes[
    newIndex < 0 ? newIndex + siblingRoutes.length : newIndex
  ]
}

function trimLeadingSlash(str: string): string {
  return str.replace(/^\//, '')
}
