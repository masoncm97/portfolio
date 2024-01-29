'use client'

import {
  Dispatch,
  SetStateAction,
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getParamValue } from '@/util/routes-helper'

export interface CollectionsProviderState {
  collectionFilters: string[]
  defaultCollectionFilters: string[]
  highlightCollection: string | undefined
  setCollectionFilters: Dispatch<SetStateAction<string[]>>
  setHighlightCollection: Dispatch<SetStateAction<string | undefined>>
}

interface CollectionsProviderProps {
  defaultCollectionFilters: string[]
  children: React.ReactNode
}

export const CollectionsContext = createContext<CollectionsProviderState>({
  collectionFilters: [],
  defaultCollectionFilters: [],
  highlightCollection: '',
  setCollectionFilters: () => {},
  setHighlightCollection: () => {},
})

export default function CollectionsProvider({
  defaultCollectionFilters,
  children,
}: CollectionsProviderProps) {
  const router = useRouter()
  const params = useSearchParams()
  const [collectionFilters, setCollectionFilters] = useState<string[]>([])
  const [highlightCollection, setHighlightCollection] = useState<
    string | undefined
  >()

  const collectionState = {
    collectionFilters,
    defaultCollectionFilters,
    highlightCollection,
    setCollectionFilters,
    setHighlightCollection,
  }

  useEffect(() => {
    let diff = setDifference(defaultCollectionFilters, collectionFilters)
    console.log(diff)
    if (diff.length == 1) {
      setHighlightCollection(diff[0])
      router.push(`/?tag=${diff[0]}`)
    } else {
      setHighlightCollection(undefined)
      router.push(`/`)
    }
  }, [collectionFilters])

  return (
    <CollectionsContext.Provider value={collectionState}>
      {children}
    </CollectionsContext.Provider>
  )
}

function setDifference(arr1, arr2): string[] {
  const set2 = new Set(arr2)
  return arr1.filter((item) => !set2.has(item))
}
