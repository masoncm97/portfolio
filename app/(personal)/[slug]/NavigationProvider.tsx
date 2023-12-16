'use client'

import { EntryPayload } from '@/types'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

export const NavigationContext = createContext<NavigationContext | null>(null)

interface NavigationProviderProps {
  children: React.ReactNode
  entries: EntryPayload[] | undefined
}

interface NavigationState {
  navigatableEntries: EntryPayload[]
  next: string
  prev: string
}

interface NavigationContext extends NavigationState {
  updateNavigatableEntries: (navigatableEntries: EntryPayload[]) => void
}

// type NavigationContext = NavigationState & NavigationAction

export default function NavigationProvider({
  children,
  entries,
}: NavigationProviderProps) {
  const [navigatableEntries, setNavigatableEntries] = useState(entries)
  const [navigationState, setNavigationState] = useState<NavigationState>({
    navigatableEntries: [],
    prev: '',
    next: '',
  })
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const updateNavigatableEntries = (navigatableEntries: EntryPayload[]) => {
    console.log('updating')
    setNavigatableEntries(navigatableEntries)
  }

  // let navigatableEntries: EntryPayload[] = entries || []

  if (Array.from(searchParams.keys()).length > 0) {
    // navigatableEntries = []
    // setNavigatableEntries([])
    let filteredEntries: EntryPayload[] = [] // Temporary array to accumulate entries

    for (const key of searchParams.keys()) {
      const filteredEntriesByKey = entries?.filter(
        (entry) =>
          entry.tags?.some(
            (tag) =>
              tag.title === searchParams.get(key) ||
              entry.category?.title === searchParams.get(key),
          ),
      )
      if (filteredEntriesByKey) {
        // setNavigatableEntries((prev) => [...prev, ...filteredEntries])
        // navigatableEntries.push(...filteredEntries)
        filteredEntries = [...filteredEntries, ...filteredEntriesByKey]
      }
    }
    setNavigatableEntries(filteredEntries)
  }

  const current = trimLeadingSlash(pathName)

  useEffect(() => {
    if (current) {
      sessionStorage.setItem('lastViewedImage', current)
    }
  }, [current])

  useEffect(() => {
    const siblingRoutes = generateSiblingRoutes(navigatableEntries)
    if (navigatableEntries) {
      setNavigationState({
        navigatableEntries: navigatableEntries,
        prev: getNextRoute(current, siblingRoutes, (index) => index + 1),
        next: getNextRoute(current, siblingRoutes, (index) => index - 1),
      })
    }
  }, [navigatableEntries, current])

  // const navigationContext: NavigationContext = {
  //   prev: getNextRoute(current, siblingRoutes, (index) => index + 1),
  //   next: getNextRoute(current, siblingRoutes, (index) => index - 1),
  //   setNavigatableEntries: setNavigatableEntries,
  // }

  // useEffect(() => {
  //   setNavigationState({
  //     prev: getNextRoute(current, siblingRoutes, (index) => index + 1),
  //     next: getNextRoute(current, siblingRoutes, (index) => index - 1),
  //   })
  // }, [current, siblingRoutes])

  // setNavigationState({
  //   prev: getNextRoute(current, siblingRoutes, (index) => index + 1),
  //   next: getNextRoute(current, siblingRoutes, (index) => index - 1),
  // })

  // const navigationContext: NavigationContext = {
  //   ...navigationState,
  //   updateNavigatableEntries: updateNavigatableEntries,
  // }

  return (
    <NavigationContext.Provider
      value={{ ...navigationState, updateNavigatableEntries }}
    >
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
