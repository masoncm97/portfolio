'use client'

import ThemeProvider from './ThemeProvider'
import CollectionsProvider from './CollectionsProvider'
import LayoutProvider from './LayoutProvider'
import { LayoutCollection, ThemeCollection } from '@/types'

export interface ProvidersInterface {
  children: React.ReactNode
  layoutCollection: LayoutCollection
  themeCollection: ThemeCollection
  defaultCollectionFilters: string[]
}

export function Providers({
  children,
  layoutCollection,
  themeCollection,
  defaultCollectionFilters,
}) {
  return (
    <LayoutProvider layoutCollection={layoutCollection}>
      <ThemeProvider themeCollection={themeCollection}>
        <CollectionsProvider
          defaultCollectionFilters={defaultCollectionFilters}
        >
          {children}
        </CollectionsProvider>
      </ThemeProvider>
    </LayoutProvider>
  )
}
