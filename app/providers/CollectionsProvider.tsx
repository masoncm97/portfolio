'use client'

import {
  Dispatch,
  SetStateAction,
  createContext,
  useReducer,
  useContext,
  useState,
} from 'react'

export interface CollectionsProviderState {
  collectionFilters: string[]
  setCollectionFilters: Dispatch<SetStateAction<string[]>>
}

interface CollectionsProviderProps {
  children: React.ReactNode
}

export const CollectionsContext = createContext<CollectionsProviderState>({
  collectionFilters: [],
  setCollectionFilters: () => {},
})

export default function CollectionsProvider({
  // defaultCollectionFilters,
  children,
}: CollectionsProviderProps) {
  const [collectionFilters, setCollectionFilters] = useState<string[]>([])
  const collectionState = {
    collectionFilters,
    setCollectionFilters,
  }
  console.log(collectionFilters)

  return (
    <CollectionsContext.Provider value={collectionState}>
      {children}
    </CollectionsContext.Provider>
  )
}
