'use client'

import { EntryPayload } from '@/types'
import { usePathname, useSearchParams } from 'next/navigation'
import { createContext } from 'react'

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

  const navigationState = {
    prev: getNextRoute(
      trimLeadingSlash(pathName),
      siblingRoutes,
      (index) => index + 1,
    ),
    next: getNextRoute(
      trimLeadingSlash(pathName),
      siblingRoutes,
      (index) => index - 1,
    ),
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

  // Apply the modifier function and ensure the result is within bounds using modulo
  const newIndex = modifier(currentIndex) % siblingRoutes.length

  // Adjust for negative indices resulting from the modifier function
  return siblingRoutes[
    newIndex < 0 ? newIndex + siblingRoutes.length : newIndex
  ]
}

function trimLeadingSlash(str: string): string {
  return str.replace(/^\//, '')
}
