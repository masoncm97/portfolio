import { EntryPayload } from '@/types'

export function generateSiblingRoutes(
  entries: EntryPayload[] | undefined,
): string[] {
  if (!entries) return []
  return entries.map((entry) => `/${entry.slug}`)
}

export function formatString(str: string): string {
  return str.replace(/[\u200B-\u200D\uFEFF]/g, '')
}

export function generateQuery(str: string | undefined): string {
  if (!str) return ''
  return formatString(str.toLowerCase())
}
