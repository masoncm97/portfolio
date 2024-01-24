import { createContext, useContext } from 'react'

const TagContext = createContext<string | undefined>(undefined)
export const useTag = () => useContext(TagContext)

interface TagProviderProps {
  tag: string | undefined
  children: React.ReactNode
}

export default function TagProvider({ tag, children }: TagProviderProps) {
  return <TagContext.Provider value={tag}>{children}</TagContext.Provider>
}
